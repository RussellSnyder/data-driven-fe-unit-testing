import { render, screen } from '@testing-library/react';
import PeopleTable from './people-table';
import mockPeople from '../../test-data/people.json';

describe('PeopleTable', () => {
    test('renders people table header', () => {
        render(<PeopleTable people={mockPeople} />);
        const [name, email] = screen.getAllByRole('columnheader');

        expect(name.textContent).toBe('Name');
        expect(email.textContent).toBe('Email');
    });

    test('renders people table rows', () => {
        render(<PeopleTable people={mockPeople} />);
        const [col1, col2] = screen.getAllByRole('cell');

        expect(col1.textContent).toBe(mockPeople[0].name);
        expect(col2.textContent).toBe(mockPeople[0].email);
    });
})