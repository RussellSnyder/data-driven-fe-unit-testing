import { FILTER_VALUES } from '../constants/constants';

export const registrationControlSettings = {
    label: "Registration Status",
    id: 'registration-dropdown',
    options: [
        { value: FILTER_VALUES.OFF, label: 'All' },
        { value: FILTER_VALUES.WITH, label: 'Registered Only' },
        { value: FILTER_VALUES.WITHOUT, label: 'Unregistered Only' }
    ]
}

export const imageControlSettings = {
    label: "Photo Status",
    id: 'image-dropdown',
    options: [
        { value: FILTER_VALUES.OFF, label: 'All' },
        { value: FILTER_VALUES.WITH, label: 'With Photo' },
        { value: FILTER_VALUES.WITHOUT, label: 'Without Photo' }
    ]
}
