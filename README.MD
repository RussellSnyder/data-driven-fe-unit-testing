## A Very Possible Reality

Tester or Product Owner: "Oh no! The Frontend of the app is broken! There is a whole column missing from this table!"



FE Developer: "Impossible, we have 100% test coverage"
BE Developer: "Impossible, we have 100% test coverage"


Me: "Yeah, but FE

## Problem

FE unit tests pass, but FE fails when deployed

Stems from disconnect between real API responses and mock data used for FE testing.

There SHOULD be decoupling between FE and BE to speed up development time, not at the expense of product quality.

"A component test that passes in development but is clearly failing in production is worse than no test at all because it creates a false sense of safety"

"100% test coverage doesn't mean anything for the FE code if the mock data being used doesn't reflect the real possibilities in the production app. This is especially true for a highly data driven app."

## Wait, DonUnit Tests Versus End

## Wait, Doesn't Typescript Solve This?

If you are not using fullstack typescript, then no chance. FE models can become out of sync as well.

Also, the run time types might be different from the declared static, compile time types.

Typescript cannot know what the type is at runtime :-/

## Possible Solution

### Use Real Backend Responses

- May need to anonymise data, but the response shape and data possibilities must match
- Variations for each type of response that could occur.

### Create Scripts To Generate Responses From Backend

- This script should create data that matches real API response shapes

### Create Script To Store Responses Close To Tests

- Once the response is generated, save it to JSON files.
- The response will be JSON, so the mock data should be JSON

### Run Script To Generate & Store Responses Before Running FE Unit Tests

## IRL Example

### Overview

React FE
Express/Node BE

### Setup

#### BE

```bash
cd backend
npm i
npm start
```

backend has one route api/people
`test-data-generator.js` uses the same controller and service to create data as the real api.
The difference is the repository level.
Repo detects if in testing environment and sends anonymized data, but same shape

#### FE

```bash
cd frontend
npm i
npm start
```

Frontend built using create react app

- comes with jest
- load json files directly in test

components/
    people-list
services/
    people-api

- mock response from people api for people-list
- Decouples unit tests

### People List

- BE returns a list of people

### FE

- Expects the current response

### API is updated, Name is now UserName

- Minor change
- FE unit tests still pass
- Production app is broken as FE relied on this email address

### Run Script to Regenerate test data

- FE Unit Tests Fail (Yay!)
- Update FE Unit Tests




### Bonus - Automate Process For PRs

Safety on another level
- Less likely to merge FE code that breaks in production
- If not on master, set BE and FE Branch

### Conclusion

FE tests can be fragile if they consume mock data that does not reflect the shape of real production data.
If the creation of mock data for FE unit tests is generated on the backend, it is more likely to have the shape of real life data.
Response Status types and other error states that are sent to the FE can be handled in Unit tests using this approach.

## Organization level

Real root: FE/BE team communication issues. Maybe have dedicated API developer who sets up and ensures this quality. All data shapes need to be covered to really have 100% coverage.
