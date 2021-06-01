import './App.css';
import { getPeople } from './services/people-api';
import { useEffect, useState } from 'react';
import PeopleTable from './components/people-table';
import FilterControl from './components/filter-control';
import { FILTER_VALUES, LOADING_STATE } from './constants/constants';
import { registrationControlSettings, imageControlSettings } from './components/filter-control-settings'

function App() {
  const [loadingState, setLoadingState] = useState(LOADING_STATE.Loading);
  const [people, setPeople] = useState([]);

  const [isRegisteredFilter, setIsRegisteredFilter] = useState(FILTER_VALUES.OFF);
  const [hasImageFilter, setHasImageFilter] = useState(FILTER_VALUES.OFF);

  useEffect(() => {
    async function loadData() {
      setLoadingState(LOADING_STATE.Loading);

      const queryParamsArray = [
        isRegisteredFilter !== FILTER_VALUES.OFF ? `isRegistered=${isRegisteredFilter}` : false,
        hasImageFilter !== FILTER_VALUES.OFF ? `hasImage=${hasImageFilter}` : false,
      ].filter(Boolean)

      try {
        const { status, data, error } = await getPeople(queryParamsArray);

        if (status === 200) {
          setPeople(data);
          setLoadingState(data.length > 0 ? LOADING_STATE.DataAvailable : LOADING_STATE.NoData)
        } else {
          setLoadingState(LOADING_STATE.Error)
        }
      } catch (e) {
        setLoadingState(LOADING_STATE.Error)
      }
    }
    
    loadData();
  }, [isRegisteredFilter, hasImageFilter]);

  const MainContent = () => (
    <>
      {loadingState === LOADING_STATE.Loading && <h3 data-testid="loading">Loading People...</h3>}
      {loadingState === LOADING_STATE.DataAvailable && <PeopleTable            
            people={people}
            hideImageColumn={hasImageFilter === FILTER_VALUES.WITHOUT}
            hideRegistrationColumn={isRegisteredFilter !== FILTER_VALUES.OFF}
            />}
      {loadingState === LOADING_STATE.NoData && <h3 data-testid="empty-result">Much empty</h3>}
      {loadingState === LOADING_STATE.Error && <div className="error" data-testid="errors"><h3>An Error Occurred</h3></div>}
    </>    
  )

  return (
    <div className="App" data-testid="app">
      <header data-testid="app-header">
        <h1>People</h1>
      </header>

      <div className="controls">
        <FilterControl { ...registrationControlSettings }
          handleChange={setIsRegisteredFilter}
          value={isRegisteredFilter}
        />
        <FilterControl { ...imageControlSettings }
          handleChange={setHasImageFilter}
          value={hasImageFilter}
        />
      </div>
      <div className="main-content">
        <MainContent />
      </div>
    </div>
  );
}

export default App;
