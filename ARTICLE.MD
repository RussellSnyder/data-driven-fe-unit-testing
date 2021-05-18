# Safer Frontend Testing

As a seasoned software developer, I have come to the conclusion that the [testing pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) is in fact the best way to write application tests. It really is better to write many unit tests than to write many UI tests for pretty much the exact reasons outlined in the article above: speed and isolation.

However, it has been my experience that sometimes isolation goes to far to the point that the data used in frontend testing no longer reflects the data that is used in the real production app.

> A component test that passes in development but clearly fails in production is worse than having no test at all because it creates a false sense of security.

In this article, I will demonstrate one way that speed and isolation can be maintained between frontend and backend development without compromising the quality of frontend unit tests. But first, for those who have never encountered this issue, let me give you a scenario that has happened to me a few times in my career:

## A Very Possible Scenario

### Actors

- **PO**: Product Owner
- **FE**: Frontend
- **BE**: Backend
- **Specs**: PO/Client defined specifications
- **TDD**: Test Driven Development
- **E2E**: End To End testing

| PO: "We want 100% test coverage on our unit tests for this feature. We (don't have time for integration or E2E tests **or** will do more testing after release **or** don't have an environment that supports specific BE/FE branch deployment)."

| FE: "Used TDD and have 100% unit test coverage."

| BE: "Used TDD and have 100% unit test coverage."

### 🚀 Feature Deployed To Production

### 🚨 Frontend Of Feature Is Clearly Broken: Begin Blame Game

| PO: "Oh no! The Frontend of the app is broken! What happened FE!?"

| FE: "This is impossible! All of unit tests pass with the given Specs and *worked on my machine*<sup>tm</sup>"

| BE: "Ah, I see the problem. We changed 'id' to 'guid' in the API response as it was more inline with the database column name.

| FE: "I didn't know this and wrote all my code and unit tests to expect 'id' in the response. The keys of the table rely on that property to be sorted. Why didn't you tell me you changed it!?"

| BE: "I (didn't know that you needed that property **or** thought you would see the change **or** went to get groceries and forgot **or** just don't like FE developers)"

| FE: "I'm using mock data based on what we decided the API responses shape would be at kickoff. you said it would be id and not guid in the response!?" 😡

### 🔥 Stressful And Unpragmatic Blame Game Continues 🔥

## So, What Is Happening?

In short, the frontend tests pass in development but the frontend in the real production application is clearly broken when deployed. This stems from the disconnect between the real API responses from the backend and the mock data used by the frontend developers in unit tests.

## The Conundrum

> Having many unit tests and fewer integration/E2E tests promotes speed, but it may create application states that do not work together.

There absolutely **SHOULD** be a decoupling between Frontend and Backend as well as between features, but only **to a point**. As we saw in the scenario above, that point was overstepped leading to a broken feature. So what are some solutions to this problem?

## ⛔ Non-Solution 1: More Integration And E2E Tests

Although this would ensure safety, as is clear from the testing pyramid, this will slow development down to a crawl which is frustrating for developers and businesses alike.

## ⛔ Non-Solution 2: Branch Based Deployment Setup

If there is a way to create an environment where a specific frontend branch and backend branch AND database state can be deployed, this is a good way to see what errors may arise when going to production. However, this could be costly, complicated to setup and the data used in the branch based deployment might still be fatally different from that which is on the production branch.

> 100% test coverage doesn't mean anything for the FE code if the mock data being used doesn't reflect the real possibilities in the production app. This is especially true for a highly data driven app.

## ✔️ Possible Solution: Generate Mock Data As Close to Backend/Production As Possible

> Don't use imaginary API responses for Frontend unit tests. Generate and store API responses from the Backend whose shape reflects all production data possibilities.

Mock data is needed for frontend unit testing in order for tests to run quickly. There cannot be a call to the backend for each tests because this will be slow and will not scale well.

But where should mock data come from?

> Although traditionally a pure frontend task, I propose the creation of mock api data, specifically data intended for frontend tests, should be a shared responsibility between frontend and backend.

I would propose a system that basically follows these steps:

1. Create backend data generator that uses as much of the backend code as possible and creates responses for frontend unit testing.
2. Frontend calls backend generator and stores response in json files to be used by tests.
3. Frontend tests **only use** data from these json files for mock data when the components under test consumes data from the backend.

The data generator would not need to be run on each test run, but rather only when a frontend branch has a specific backend branch or when the master backend is updated.

## Less Talk, More Code

follow the setup outlined in repo (here I guess)

### Setup

### Run Tests

### Change API Response, Frontend Still Passes 😮

### Run Test Data Generator

### Frontend Tests Fail 🥳

### Fix The Tests

## Technical Considerations

### Fullstack Typescript

Shared types is amazing. Compile time errors instead of run time errors

BUT still might not catch all the errors.

### Push Data Generation Placement Close to DB in Backend

> If using a classic domain driven architecture, create mock data in the repository and create files from the response of the controllers. This will promote more realistic data as the flow will be the same as data from a real database.

## Organizational Considerations

More times than not, the root of seemingly 'technical' issues in a development team actually stem from organizational mismanagement.

> Many companies would like to think that a new cloud provider is what is needed for a better production environment, but it is more often that the frontend and backend teams just aren't communicating in a healthy way.

### Split Between BE/FE Team Is Too Sharp

Some companies are so tired of issues from the traditional BE/FE split that they only hire fullstack developers. However, these fullstack developers often prefer one side or the other and often split among themselves anyway.

> Unit tests using stale data shapes is a symptom of a team that is either too hyperspecialized or lacking a bridge between teams.

Consider a fullstack lead or dedicated api developer if this 


If a frontend developer is too junior or doesn't have a backend environment available to them, a more senior frontend or fullstack developer could create data and add it to the git for other frontend developers to use.

From an organizational standpoint, it is been my experience that a fullstack member on each team is needed for exactly these types of actions.

### Use Real Backend Responses

- May need to anonymise data, but the response shape and data possibilities must match
- Variations for each type of response that could occur.

### Create Scripts To Generate Responses From Backend

- This script should create data that matches real API response shapes

### Create Script To Store Responses Close To Tests

- Once the response is generated, save it to JSON files.
- The response will be JSON, so the mock data should be JSON

### Run Script To Generate & Store Responses Before Running FE Unit Tests

