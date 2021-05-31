import './App.css';
import { getPeople } from './services/people-api';
import { useEffect, useState } from 'react';
import PeopleTable from './components/people-table';

const FILTER = {
  WITH: 'true',
  WITHOUT: 'false',
  OFF: 'off'
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [people, setPeople] = useState([]);

  const [isRegisteredFilter, setIsRegisteredFilter] = useState(FILTER.OFF);
  const [hasImageFilter, setHasImageFilter] = useState(FILTER.OFF);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      const queryParamsArray = [
        isRegisteredFilter !== FILTER.OFF ? `isRegistered=${isRegisteredFilter}` : false,
        hasImageFilter !== FILTER.OFF ? `hasImage=${hasImageFilter}` : false,
      ].filter(Boolean)

      try {
        const { status, data, error } = await getPeople(queryParamsArray);

        if (status === 200) {
          setError('');
          setPeople(data);
          setIsLoading(false);
        } else {
          setError(JSON.stringify(error))
          setPeople([]);
          setIsLoading(false);
        }
      } catch (e) {
        setError(e)
        setPeople([]);
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [isRegisteredFilter, hasImageFilter]);

  return (
    <div className="App" data-testid="app">
      <header data-testid="app-header">
        <h1>People</h1>
      </header>

      <div className="controls">
        <div className="control">
          <label>Registration Status</label>
          <select data-testid='registration-dropdown' value={isRegisteredFilter} onChange={(e) => setIsRegisteredFilter(e.target.value)}>
            <option value={FILTER.OFF}>All</option>
            <option value={FILTER.WITH}>Registered Only</option>
            <option value={FILTER.WITHOUT}>Unregistered Only</option>
          </select>
        </div>
        <div className="control">
          <label>Photo Status</label>
          <select data-testid='image-dropdown' value={hasImageFilter} onChange={(e) => setHasImageFilter(e.target.value)}>
            <option value={FILTER.OFF}>All</option>
            <option value={FILTER.WITH}>With Photos</option>
            <option value={FILTER.WITHOUT}>Without Photos</option>
          </select>
        </div>
      </div>
      {error && <div className="error" data-testid="errors"><h3>{error}</h3></div>}
      {!error && people.length > 0 && <PeopleTable            
            people={people}
            hideImageColumn={hasImageFilter === FILTER.WITHOUT}
            hideRegistrationColumn={isRegisteredFilter !== FILTER.OFF}
      />}
      {!isLoading && !error && people.length === 0 && <h3 data-testid="empty-result">Much empty</h3>}
      {isLoading && <h3 data-testid="loading">Loading People...</h3>}
    </div>
  );
}

export default App;
