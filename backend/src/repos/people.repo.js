const faker = require('faker');

const generateFakeData = () => {
    return Array(30).fill(undefined).map(() => ({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        name: faker.name.firstName(),
        email: faker.name.findName(),
        isRegistered: faker.datatype.boolean(),
        image: Math.random() > 0.5 ? faker.image.avatar() : null,
    }));
}

class PeopleRepo {
    isTesting = false;

    constructor(isTesting) {
        this.isTesting = isTesting;
    }

    getPeople = () => {
        if (this.isTesting) {
            // here we would get as close as possible to real data
            // If the data is sensitive, here is where we could strip the sensitive data
            return generateFakeData();
        } else {
            // here is where we would connect to a database in a real app
            // but for demonstration purposes, we'll just return the fake data again
            return generateFakeData();
        }
    }
}

const isTesting = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'testing' 
const peopleRepo = new PeopleRepo(isTesting)

module.exports = peopleRepo;