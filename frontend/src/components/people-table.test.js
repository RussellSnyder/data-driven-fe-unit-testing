import { render, screen } from '@testing-library/react';
import PeopleTable from './people-table';
import peopleResponse from '../../test-data/people/people.json';

const mockPeople = peopleResponse.data;

describe('PeopleTable', () => {
    test('renders people table header', () => {
        render(<PeopleTable people={mockPeople} />);
        const [image, name, email, isRegistered] = screen.getAllByRole('columnheader');

        expect(image.textContent).toBe('Image');
        expect(name.textContent).toBe('Name');
        expect(email.textContent).toBe('Email');
        expect(isRegistered.textContent).toBe('Is Registered');
    });

    test('renders people table rows', () => {
        render(<PeopleTable people={mockPeople} />);
        // const [imageCol, nameCol, emailCol, isRegisteredCol] = screen.getAllByRole('cell');
        const tableCells = screen.getAllByRole('cell');

        mockPeople.forEach((person, i) => {
            const [imageCol, nameCol, emailCol, isRegisteredCol] = tableCells.slice(i * 4);
            const { image, name, email, isRegistered } = person;

            if (image) {
                const imageNode = imageCol.firstElementChild

                expect(imageNode.tagName).toBe('IMG');
                expect(imageNode.src).toBe(image);
            } else {
                expect(imageCol.textContent).toBe("no image available");
            }

            expect(nameCol.textContent).toContain(name);

            expect(emailCol.textContent).toContain(email);

            const expectedIsRegisteredContent = isRegistered ? "Registered" : "Not Registered";
            expect(isRegisteredCol.textContent).toBe(expectedIsRegisteredContent);
        })

    });

    describe('hideImageColumn=true', () => {
        test('it does not render the image table header', () => {
            render(<PeopleTable people={mockPeople} hideImageColumn={true} />);
            const [name, email, isRegistered] = screen.getAllByRole('columnheader');

            expect(name.textContent).toBe('Name');
            expect(email.textContent).toBe('Email');
            expect(isRegistered.textContent).toBe('Is Registered');
        });

        test('it does not render the image column in the people table rows', () => {
            render(<PeopleTable people={mockPeople} hideImageColumn={true} />);

            const tableCells = screen.getAllByRole('cell');

            mockPeople.forEach((person, i) => {
                const [nameCol, emailCol, isRegisteredCol] = tableCells.slice(i * 3);
                const { name, email, isRegistered } = person;

                expect(nameCol.textContent).toContain(name);

                expect(emailCol.textContent).toContain(email);

                const expectedIsRegisteredContent = isRegistered ? "Registered" : "Not Registered";
                expect(isRegisteredCol.textContent).toBe(expectedIsRegisteredContent);
            })
        })

    })

    describe('hideRegistrationColumn=true', () => {
        test('it does not render the registration table header', () => {
            render(<PeopleTable people={mockPeople} hideRegistrationColumn={true} />);
            const [image, name, email, isRegistered] = screen.getAllByRole('columnheader');

            expect(image.textContent).toBe('Image');
            expect(name.textContent).toBe('Name');
            expect(email.textContent).toBe('Email');
            expect(isRegistered).not.toBeDefined();
        });

        test('it does not render the registration column in the people table rows', () => {
            render(<PeopleTable people={mockPeople} hideRegistrationColumn={true} />);

            const tableCells = screen.getAllByRole('cell');

            mockPeople.forEach((person, i) => {
                const [imageCol, nameCol, emailCol] = tableCells.slice(i * 3);
                const { image, name, email } = person;

                if (image) {
                    const imageNode = imageCol.firstElementChild

                    expect(imageNode.tagName).toBe('IMG');
                    expect(imageNode.src).toBe(image);
                } else {
                    expect(imageCol.textContent).toBe("no image available");
                }

                expect(nameCol.textContent).toContain(name);

                expect(emailCol.textContent).toContain(email);
            })
        })

    })

    describe('hideRegistrationColumn=true and hideImageColumn=true', () => {
        test('does not display image or registration column headers', () => {
            render(<PeopleTable people={mockPeople} hideImageColumn hideRegistrationColumn />);
            const [name, email, ...rest] = screen.getAllByRole('columnheader');

            expect(name.textContent).toBe('Name');
            expect(email.textContent).toBe('Email');
            expect(rest).toBeDefined();
        });

        test('does not render registration or image for people table rows', () => {
            render(<PeopleTable people={mockPeople} hideImageColumn hideRegistrationColumn />);

            const tableCells = screen.getAllByRole('cell');

            mockPeople.forEach((person, i) => {
                const [nameCol, emailCol] = tableCells.slice(i * 2);
                const { name, email } = person;


                expect(nameCol.textContent).toContain(name);
                expect(emailCol.textContent).toContain(email);
            })

        });
    })
})