import { render, screen, fireEvent, act, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import App from './App';

import mockPeopleResponse from '../test-data/people/people.json';
import mockPeopleResponse_isRegistered_true from '../test-data/people/people-isRegistered-true.json';
import mockPeopleResponse_isRegistered_false from '../test-data/people/people-isRegistered-false.json';

import { getPeople } from './services/people-api';
jest.mock('./services/people-api', () => ({
  getPeople: jest.fn()
}));



describe('App', () => {
  describe('initial state', () => {
    beforeEach(async () => {
      getPeople.mockImplementationOnce(() => new Promise(() => null))

      render(<App />);

      await waitFor(() => {
        expect(screen.getByTestId('app')).toBeInTheDocument()
      })
    })
    
    test('loading status is present', () => {
      const loading = screen.getByTestId('loading');
      expect(loading).toBeInTheDocument();
    });
    
    test('header is present', () => {
      const header = screen.getByTestId('app-header');
      expect(header).toBeInTheDocument();
    });
  })

  describe('first data load - DATA AVAILABLE', () => {
    beforeEach(async () => {
      getPeople.mockImplementationOnce(() => Promise.resolve(mockPeopleResponse))

      render(<App />);

      await waitFor(() => {
        expect(screen.getByTestId('app')).toBeInTheDocument()
      })
    })

    test('loading element is removed and data table is present', async () => {
      const table = await screen.getByTestId('people-table');
      expect(table).toBeInTheDocument();
    });
  })

  describe('first data load - EMPTY', () => {
    beforeEach(async () => {
      getPeople.mockImplementationOnce(() => Promise.resolve({ status: 200, data: [] }))

      render(<App />);

      await waitFor(() => {
        expect(screen.getByTestId('app')).toBeInTheDocument()
      })
    })

    test('emptyResult element is present', async () => {
      const emptyResult = await screen.getByTestId('empty-result');
      expect(emptyResult).toBeInTheDocument();
    });
  })

  describe('first data load - ERROR', () => {
    beforeEach(async () => {
      getPeople.mockImplementationOnce(() => Promise.resolve({ error: 'no results' }))

      render(<App />);

      await waitFor(() => {
        expect(screen.getByTestId('app')).toBeInTheDocument()
      })
    })

    test('error element is present', async () => {
      const errors = await screen.getByTestId('errors');
      expect(errors).toBeInTheDocument();
    });
  })

  describe('interactions', () => {
    describe('registration dropdown', () => {
      let registrationDropdown;

      beforeEach(async () => {
        getPeople.mockImplementationOnce(() => mockPeopleResponse);
        render(<App />);

        await waitFor(() => {
          expect(screen.getByTestId('app')).toBeInTheDocument()
        })
  
        registrationDropdown = screen.getByTestId('registration-dropdown');
        expect(registrationDropdown).toBeInTheDocument();
      })

      describe('change -> true', () => {
        test('it calls the api service with isRegistered=true', async () => {
          getPeople.mockImplementationOnce(() => mockPeopleResponse_isRegistered_true);

          fireEvent.change(registrationDropdown, { target: { value: 'true' } })
          await waitFor(() => expect(getPeople).toHaveBeenCalledWith(['isRegistered=true']))
        })

      })
      describe('change -> false', () => {
        test('it calls the api service with isRegistered=false', async () => {
          getPeople.mockImplementationOnce(() => mockPeopleResponse_isRegistered_false);

          fireEvent.change(registrationDropdown, { target: { value: 'false' } })
          await waitFor(() => expect(getPeople).toHaveBeenCalledWith(['isRegistered=false']))
        })
      })
      describe.skip('change -> off', () => {
        test('it calls the api service without isRegisteredFilter in queryParamArray', async () => {
          getPeople.mockImplementationOnce(() => mockPeopleResponse);

          fireEvent.change(registrationDropdown, { target: { value: 'off' } })
          await waitFor(() => expect(getPeople).toHaveBeenCalledWith([]))
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
