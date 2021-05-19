import { render, screen, fireEvent, act, waitFor, wait, waitForElementToBeRemoved } from '@testing-library/react';
import ReactDOM from 'react-dom';

import App from './App';

import mockPeopleResponse from '../test-data/people/people.json';
import mockPeopleResponse_isRegistered_true from '../test-data/people/people-isRegistered-true.json';

import { getPeople } from './services/people-api';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});


describe('App', () => {
  describe('initial state', () => {
    beforeEach(() => {
      act(() => {
        ReactDOM.render(<App />, container);
      });
    })

    test('renders heading', () => {
      const header = screen.getByTestId('app-header');
      expect(header).toBeInTheDocument();
      expect(header.textContent).toBe('People');
    });

    test('shows "Loading People..."', () => {
      const loading = screen.getByTestId('loading');
      expect(loading).toBeInTheDocument();
      expect(loading.textContent).toBe('Loading People...');
    });
  })

  describe('after first data load', () => {
    test('data table is present', async () => {

      jest.mock('../src/services/people-api', () => {
        getPeople: jest.fn(() => Promise.resolve(mockPeopleResponse))
      });

      ReactDOM.render(<App />, container);

      await waitForElementToBeRemoved(screen.getByTestId('loading'));

      const table = await screen.getByTestId('people-table');
      expect(table).toBeInTheDocument();
  });
})

  describe.skip('interactions', () => {
    describe('registration dropdown', () => {
      describe('change -> true', () => {
        let getPeopleMock;

        beforeEach(() => {
          jest.mock('./services/people-api', () => ({
            getPeople: () => mockPeopleResponse_isRegistered_true
          }));

          const mock = require('./services/people-api');
          getPeopleMock = mock.getPeople;
  
          ReactDOM.render(<App />, container);

          const registrationDropdown = screen.getByTestId('registration-dropdown');
          fireEvent.change(registrationDropdown, { target: { value: 'true' } })
        })

        test('it calls the api service with isRegistered=true', async () => {  
          // await wait();
          expect(getPeopleMock.getPeople).toHaveBeenCalledWith(['isRegistered=true']);
        })

        test.skip('table only displays registered users', () => {

        })
      })
      describe('change -> false', () => {
        test('it calls the api service with isRegistered=false', () => {
        })
      })
      describe('change -> off', () => {
        test('it calls the api service without isRegisteredFilter in queryParamArray', () => {
        })
      })
    });
    describe.skip('image dropdown', () => {    
      describe('change -> true', () => {
        test('it calls the api service with hasImage=true', () => {
        })
      })
      describe('change -> false', () => {
        test('it calls the api service with hasImage=false', () => {
        })
      })
      describe('change -> off', () => {
        test('it calls the api service without hasImage in queryParamArray', () => {
        })
      })
    });
  })
})
