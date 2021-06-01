// import react from 'react';
// import { render, screen, fireEvent, act, waitFor, waitForElementToBeRemoved, cleanup } from '@testing-library/react';

// import App from './App';

// import mockPeopleResponse from '../test-data/people/people.json';
// import mockPeopleResponse_isRegistered_true from '../test-data/people/people-isRegistered-true.json';
// import mockPeopleResponse_isRegistered_false from '../test-data/people/people-isRegistered-false.json';
// import mockPeopleResponse_hasImage_true from '../test-data/people/people-hasImage-true.json';
// import mockPeopleResponse_hasImage_false from '../test-data/people/people-hasImage-false.json';

// import { getPeople } from './services/people-api';
// import PeopleTable from './components/people-table'
// import FilterControl, { FILTER_VALUES } from './components/filter-control';

// afterEach(() => {
//   cleanup();
// })

// // Mock services and components
// jest.mock('./services/people-api', () => ({
//   getPeople: jest.fn()
// }));

// jest.mock('./components/people-table', () => {
//   return jest.fn(() => null)
// });

// jest.mock('./components/filter-control', () => ({
//   default: jest.fn(() => null),
//   FILTER_VALUES: {
//     WITH: 'true',
//     WITHOUT: 'false',
//     OFF: 'off'
//   }
// }));

// describe.skip('App - Integration Testing', () => {
//   describe.only('initial state', () => {
//     beforeEach(async () => {
//       getPeople.mockImplementationOnce(() => new Promise(() => null))

//       render(<App />);

//       await waitFor(() => {
//         expect(screen.getByTestId('app')).toBeInTheDocument()
//       })
//     })
    
//     test('loading status is present', () => {
//       const loading = screen.getByTestId('loading');
//       expect(loading).toBeInTheDocument();
//     });
    
//     test('header is present', () => {
//       const header = screen.getByTestId('app-header');
//       expect(header).toBeInTheDocument();
//     });
//   })

//   describe('first data load - DATA AVAILABLE', () => {
//     beforeEach(async () => {
//       getPeople.mockImplementationOnce(() => Promise.resolve(mockPeopleResponse))

//       render(<App />);

//       await waitFor(() => {
//         expect(screen.getByTestId('app')).toBeInTheDocument()
//       })
//     })

//     test.skip('loading element is removed and data table is present', async () => {
//       const { people: lastPeopleProps} = PeopleTable.mock.calls[0][0]

//       expect(PeopleTable).toHaveBeenCalled();      
//       expect(lastPeopleProps).toEqual(mockPeopleResponse.data)
//       // const table = await screen.getByTestId('people-table');
//       // expect(table).toBeInTheDocument();
//     });
//   })

//   describe('first data load - EMPTY', () => {
//     beforeEach(async () => {
//       getPeople.mockImplementationOnce(() => Promise.resolve({ status: 200, data: [] }))

//       render(<App />);

//       await waitFor(() => {
//         expect(screen.getByTestId('app')).toBeInTheDocument()
//       })
//     })

//     test('emptyResult element is present', async () => {
//       const emptyResult = await screen.getByTestId('empty-result');
//       expect(emptyResult).toBeInTheDocument();
//     });
//   })

//   describe('first data load - ERROR', () => {
//     beforeEach(async () => {
//       getPeople.mockImplementationOnce(() => Promise.resolve({ error: 'no results' }))

//       render(<App />);

//       await waitFor(() => {
//         expect(screen.getByTestId('app')).toBeInTheDocument()
//       })
//     })

//     test('error element is present', async () => {
//       const errors = await screen.getByTestId('errors');
//       expect(errors).toBeInTheDocument();
//     });
//   })

//   describe('interactions', () => {
//     describe('registration dropdown', () => {
//       let registrationDropdown;

//       beforeEach(async () => {
//         getPeople.mockImplementationOnce(() => mockPeopleResponse);

//         render(<App />);

//         await waitFor(() => {
//           expect(screen.getByTestId('app')).toBeInTheDocument()
//         })
  
//         registrationDropdown = screen.getByTestId('registration-dropdown');
//         expect(registrationDropdown).toBeInTheDocument();
//       })

//       describe('change -> true', () => {
//         beforeEach(() => {
//           getPeople.mockImplementationOnce(() => mockPeopleResponse_isRegistered_true);
//         })
        
//         test('it calls the api service with isRegistered=true', async () => {
//           fireEvent.change(registrationDropdown, { target: { value: 'true' } })
//           await waitFor(() => expect(getPeople).toHaveBeenCalledWith(['isRegistered=true']))
//         })

//         test('it removes the registration heading from the table', async () => {
//           const [, , , isRegistered] = await screen.getAllByRole('columnheader');
//           expect(isRegistered).toBeDefined();

//           fireEvent.change(registrationDropdown, { target: { value: 'true' } })
//           await waitFor(() => expect(getPeople).toHaveBeenCalledWith(['isRegistered=true']))

//           const [, , , isRegisteredGone] = await screen.getAllByRole('columnheader');
//           expect(isRegisteredGone).not.toBeDefined();
//         });

//         test('only registered people are sent to table component', async () => {
//           const expectedProps = {
//             people: JSON.parse(mockPeopleResponse_isRegistered_true).data
//           }

//           fireEvent.change(registrationDropdown, { target: { value: 'true' } })
//           await waitFor(() => expect(PeopleTable).toHaveBeenCalledWith(expectedProps, {}));
//         });
//       })
//       describe('change -> false', () => {
//         test('it calls the api service with isRegistered=false', async () => {
//           getPeople.mockImplementationOnce(() => mockPeopleResponse_isRegistered_false);

//           fireEvent.change(registrationDropdown, { target: { value: 'false' } })
//           await waitFor(() => expect(getPeople).toHaveBeenCalledWith(['isRegistered=false']))
//         })
//       })
//       describe('change -> off', () => {
//         test('it calls the api service without isRegisteredFilter in queryParamArray', async () => {
//           getPeople.mockImplementationOnce(() => mockPeopleResponse);

//           fireEvent.change(registrationDropdown, { target: { value: 'off' } })
//           await waitFor(() => expect(getPeople).toHaveBeenCalledWith([]))
//         })
//       })
//     });

//     describe('image dropdown', () => {
//       let imageDropdown;

//       beforeEach(async () => {
//         getPeople.mockImplementationOnce(() => mockPeopleResponse);
//         render(<App />);

//         await waitFor(() => {
//           expect(screen.getByTestId('app')).toBeInTheDocument()
//         })
  
//         imageDropdown = screen.getByTestId('image-dropdown');
//         expect(imageDropdown).toBeInTheDocument();
//       })

//       describe('change -> true', () => {
//         test('it calls the api service with hasImage=true', async () => {
//           getPeople.mockImplementationOnce(() => mockPeopleResponse_hasImage_true);

//           fireEvent.change(imageDropdown, { target: { value: 'true' } })
//           await waitFor(() => expect(getPeople).toHaveBeenCalledWith(['hasImage=true']))
//         })

//       })
//       describe('change -> false', () => {
//         test('it calls the api service with hasImage=false', async () => {
//           getPeople.mockImplementationOnce(() => mockPeopleResponse_hasImage_false);

//           fireEvent.change(imageDropdown, { target: { value: 'false' } })
//           await waitFor(() => expect(getPeople).toHaveBeenCalledWith(['hasImage=false']))
//         })
//       })
//       describe('change -> off', () => {
//         test('it calls the api service without hasImageFilter in queryParamArray', async () => {
//           getPeople.mockImplementationOnce(() => mockPeopleResponse);

//           fireEvent.change(imageDropdown, { target: { value: 'off' } })
//           await waitFor(() => expect(getPeople).toHaveBeenCalledWith([]))
//         })
//       })
//     });

//     // describe.only('image dropdown', () => {
//     //   let imageDropdown;

//     //   beforeEach(async () => {
//     //     getPeople.mockImplementationOnce(() => mockPeopleResponse);
//     //     render(<App />);

//     //     await waitFor(() => {
//     //       expect(screen.getByTestId('app')).toBeInTheDocument()
//     //     })
  
//     //     imageDropdown = screen.getByTestId('image-dropdown');
//     //     expect(imageDropdown).toBeInTheDocument();
//     //   })

//     //   describe('change -> true', () => {
//     //     beforeEach(() => {          
//     //         getPeople.mockImplementationOnce(() => mockPeopleResponse_isRegistered_true);
//     //         fireEvent.change(imageDropdown, { target: { value: 'true' } })
//     //     })
//     //     test('it calls the api service with hasImage=true', async () => {
//     //       await waitFor(() => expect(getPeople).toHaveBeenCalledWith(['hasImage=true']))
//     //     })
//     //   })
//     //   describe('change -> false', () => {
//     //     beforeEach(() => {
//     //       getPeople.mockImplementationOnce(() => mockPeopleResponse_isRegistered_true);
//     //       fireEvent.change(imageDropdown, { target: { value: 'false' } })
//     //     })
//     //     test('it calls the api service with hasImage=false', async () => {
//     //       await waitFor(() => expect(getPeople).toHaveBeenCalledWith(['hasImage=false']))
//     //     })
//     //   })
//     //   describe('change -> off', () => {
//     //     beforeEach(() => {
//     //       getPeople.mockImplementationOnce(() => mockPeopleResponse);
//     //       fireEvent.change(imageDropdown, { target: { value: 'off' } })
//     //     })

//     //     test('it calls the api service without hasImage in queryParamArray', async () => {
//     //       await waitFor(() => expect(getPeople).toHaveBeenCalledWith([]));
//     //     })
//     //   })
//     // })
//   })
// })

// it("should update state on click", () => {
//     const changeSize = jest.fn();
//     const wrapper = mount(<App onClick={changeSize} />);
//     const handleClick = jest.spyOn(React, "useState");
//     handleClick.mockImplementation(size => [size, changeSize]);
 
//     wrapper.find("#para1").simulate("click");
//     expect(changeSize).toBeTruthy();
//   });
