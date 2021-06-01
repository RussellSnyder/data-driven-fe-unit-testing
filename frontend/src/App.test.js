import react from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, act, waitFor, waitForElementToBeRemoved, cleanup } from '@testing-library/react';

import App from './App';

import mockPeopleResponse from '../test-data/people/people.json';
import mockPeopleResponse_isRegistered_true from '../test-data/people/people-isRegistered-true.json';
import mockPeopleResponse_isRegistered_false from '../test-data/people/people-isRegistered-false.json';
import mockPeopleResponse_hasImage_true from '../test-data/people/people-hasImage-true.json';
import mockPeopleResponse_hasImage_false from '../test-data/people/people-hasImage-false.json';

import { getPeople } from './services/people-api';
import PeopleTable from './components/people-table'
import FilterControl from './components/filter-control';
import { FILTER_VALUES } from './constants/constants';

afterEach(() => {
  cleanup();
})

// Mock services and components
jest.mock('./services/people-api', () => ({
  getPeople: jest.fn()
}));

jest.mock('./components/people-table', () => {
  return jest.fn(() => null)
});

jest.mock('./components/filter-control', () => {
  return jest.fn(() => null)
});

describe('App', () => {
  describe('initial state', () => {
    beforeEach(async () => {
      getPeople.mockImplementationOnce(() => new Promise(() => null));

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

    test('PeopleTable receives updated people data', async () => {
      const { people: lastPeopleProps} = PeopleTable.mock.calls[0][0]

      expect(PeopleTable).toHaveBeenCalled();      
      expect(lastPeopleProps).toEqual(mockPeopleResponse.data)
    });

    test('loading element is removed', async () => {
      const loadingElement = screen.queryByText('Loading People...')
      expect(loadingElement).not.toBeInTheDocument()
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
})
