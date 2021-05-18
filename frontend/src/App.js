import './App.css';
import { getPeople, getPeopleByRegistrationStatus } from './services/people-api';
import { useEffect, useState } from 'react';
import PeopleTable from './components/people-table';

const REGISTRATION_STATUS = {
  REGISTERED: 'registered',
  UNREGISTERED: 'unregistered',
  ALL: 'all'  
}

function App() {
  const [people, setPeople] = useState([]);
  const [isRegisteredFilter, setIsRegisteredFilter] = useState(REGISTRATION_STATUS.ALL);

  useEffect(() => {
    async function loadData() {
      let people;
      if (isRegisteredFilter === REGISTRATION_STATUS.ALL) {
        people = await getPeople();
      } else if (isRegisteredFilter === REGISTRATION_STATUS.REGISTERED) {
        people = await getPeopleByRegistrationStatus(true);
      } else if (isRegisteredFilter === REGISTRATION_STATUS.UNREGISTERED) {
        people = await getPeopleByRegistrationStatus(false);
      }
      setPeople(people);
    }
    
    loadData();
  }, [isRegisteredFilter]);

  return (
    <div className="App">
      <header data-testid="app-header">
        <h1>People</h1>
      </header>

      <select value={isRegisteredFilter} onChange={(e) => setIsRegisteredFilter(e.target.value)}>
        <option value={REGISTRATION_STATUS.ALL}>All</option>
        <option value={REGISTRATION_STATUS.REGISTERED}>Registered Only</option>
        <option value={REGISTRATION_STATUS.UNREGISTERED}>Unregistered Only</option>
      </select>
      {people.length ? <PeopleTable people={people}/> : <h3>Loading People....</h3>}
    </div>
  );
}

export default App;
