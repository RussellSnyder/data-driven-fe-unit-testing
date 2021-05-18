const fs = require('fs')
const peopleController = require('./src/controllers/people.controller');

const destination = process.argv[2];
if (!destination) {
    console.error('no destination for mock data');
    return;
}

const createDataFileName = (prefix, queryParam) => {
    let suffix = '';
    Object.entries(queryParam).forEach(([key, value]) => suffix += `-${key}-${value}`)

    return `${process.cwd()}/${destination}${prefix}${suffix ? `${suffix}` : ''}.json`
}

const getQueryParamsCombinations = (queryParamsOptions) => {
    const queryParamsCombinations = [];

    Object.entries(queryParamsOptions).map(([key, values], i) => {
        const nextQueryParams = Object.entries(queryParamsOptions).slice(i + 1);
        
        values.forEach(value => {
            currentQueryParams = {
                [key]: value
            };
    
            queryParamsCombinations.push(currentQueryParams);
    
            nextQueryParams.forEach(([nextKey, nextValues]) => {
                nextValues.forEach(nextValue => {
                    const nextQueryParams = {
                        ...currentQueryParams,
                        [nextKey]: nextValue
                    }
    
                    queryParamsCombinations.push(nextQueryParams);
    
                });
            })
        })
    });
    
    return queryParamsCombinations
}

async function generatePeopleData() {
    const peopleQueryParamsCombinations = getQueryParamsCombinations(peopleController.queryParamsOptions);

    await Promise.all(peopleQueryParamsCombinations.map(async (queryParam) => {
        await peopleController.getPeople(queryParam, {
            send: (data) => fs.writeFile(createDataFileName('people', queryParam), data, { flag: 'w' }, err => {
                if (err) {
                    console.error(err)
                    return
                  }
                console.log(`created ${createDataFileName('people', queryParam)}`)
            })
        });
    }));
    
    // await peopleController.getPeople({}, {
    //     send: (data) => fs.writeFile(createDataFileName('people'), data, { flag: 'w' }, err => {
    //         if (err) {
    //             console.error(err)
    //             return
    //           }
    //         console.log(`created ${createDataFileName('people')}`)
    //     })
    // });

    // await peopleController.getPeople({ query: { 'isRegistered': 'true' }}, {
    //     send: (data) => fs.writeFile(createDataFileName('people', 'registered-true'), data, { flag: 'w' }, err => {
    //         if (err) {
    //             console.error(err)
    //             return
    //           }
    //         console.log(`created ${createDataFileName('people', 'registered-true')}`)
    //     })
    // });

    // await peopleController.getPeople({ query: { 'isRegistered': 'false' }}, {
    //     send: (data) => fs.writeFile(createDataFileName('people', 'registered-false'), data, { flag: 'w' }, err => {
    //         if (err) {
    //             console.error(err)
    //             return
    //           }
    //         console.log(`created ${createDataFileName('people', 'registered-false')}`)
    //     })
    // });    
}


generatePeopleData();