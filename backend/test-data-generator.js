const fs = require('fs')
const peopleController = require('./src/controllers/people.controller');

const destination = process.argv[2];
if (!destination) {
    console.error('no destination for mock data :-(');
    return;
}

const createDataFileName = (prefix, queryParam) => {
    let suffix = '';
    Object.entries(queryParam).forEach(([key, value]) => suffix += `-${key}-${value}`)

    return `${process.cwd()}/${destination}/${prefix}/${prefix}${suffix ? `${suffix}` : ''}.json`
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
    const peopleQueryParamsCombinations = [
        {}, // empty query
        { unsupported: 'query'}, // should return 400
        ...getQueryParamsCombinations(peopleController.queryParamsOptions)];

    await Promise.all(peopleQueryParamsCombinations.map(async (queryParam) => {
        const req = {
            query: queryParam
        }
        await peopleController.getPeople(req, {
            send: (data) => fs.writeFile(
                createDataFileName('people', queryParam),
                JSON.stringify(data),
                { flag: 'w' },
                err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                console.log(`created ${createDataFileName('people', queryParam)}`)
            })
        });
    }));
    
}

generatePeopleData();