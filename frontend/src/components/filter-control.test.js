import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import FilterControl from './filter-control';

const filterControlSettings = {
    label: "test",
    id: 'test_id',
    options: [
        { value: 'value 1', label: 'All' },
        { value: 'value 2', label: 'Registered Only' },
        { value: 'value 3', label: 'Unregistered Only' }
    ]
}

const mockChangeHandler = jest.fn();

describe('FilterControl', () => {
    beforeEach(async () => {
        render(<FilterControl
            {...filterControlSettings}
            handleChange={mockChangeHandler}
        />);
    })

    test('renders given label', async () => {
        const label = await screen.findAllByLabelText(filterControlSettings.label);
        expect(label).toBeDefined()
    });

    test('renders all options', async () => {
        const options = await screen.findAllByRole('option');
        expect(options.length).toBe(3)
        filterControlSettings.options.forEach(({ value, label }, i) => {
            expect(options[i].value).toBe(value)
            expect(options[i].text).toBe(label)
        })
    });

    test('calls changeHandler when changed', async () => {
        const expectedValue = filterControlSettings.options[2].value;
        const select = await screen.getByTestId(filterControlSettings.id);

        fireEvent.change(select, { target: { value: expectedValue } })

        expect(mockChangeHandler).toHaveBeenCalledWith(expectedValue)
    });
});

describe('FilterControl', () => {
    test('when the value prop matches an option value, the option is set selected', async () => {
        const selectedOptionIndex = 1;
        const expectedValue = filterControlSettings.options[selectedOptionIndex].value;

        const filterControlSettingsWithValue = {
            ...filterControlSettings,
            value: expectedValue
        }
        render(<FilterControl {...filterControlSettingsWithValue} />);

        const options = await screen.findAllByRole('option');
        expect(options[selectedOptionIndex].selected).toBeTruthy();
    });
});