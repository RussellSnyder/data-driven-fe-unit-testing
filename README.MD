# Fullstack Example For Article

## General Overview

React FE
Express/Node BE

## Setup

clone this repo. all instructions start from the root of the project

### BE

```bash
cd backend
npm i
npm start
```

backend has one route api/people.
`test-data-generator.js` uses the same controller and service to create data as the real api.
The difference (would be) at the repository level (if we had a real database).
Repo detects if in testing environment and (could then) send anonymised data, but with same shape.

### FE

```bash
cd frontend
npm i
npm start
```

## BE In Depth

Uses domain driven division

```text
src/
    controllers/
        people.controller
    services/
        people.service
    repos/
        people.repo
```

## FE In Depth

Frontend built using create react app

- comes with jest
- load json files directly in test

components/
    people-list
services/
    people-api

- mock response from people api for people-list during tests

## Demo - The Unseen Breaking Change

### Update BE Repo key: name is now userName

- Minor change
- FE unit tests still pass
- Production app is broken as FE relied on this email address

### Run Script to Regenerate test data

- FE Unit Tests Fail (Yay!)

### Update Frontend To Pass

- Update FE Unit Tests

### Rinse And Repeat

Ideally with automation
