const peopleRepo = require('../repos/people.repo');

class PeopleService {
    getAllPeople = (queryParams) => {
        let people = peopleRepo.getPeople();

        if (!queryParams) {
            return people;
        }

        if (queryParams.hasImage !== undefined && queryParams.hasImage) {
            people = people.filter((person) => Boolean(person.image) === queryParams.hasImage)
        }

        if (queryParams.isRegistered !== undefined) {
            people = people.filter((person) => person.isRegistered === queryParams.isRegistered)
        }

        return people;
    }
}

const peopleService = new PeopleService();

module.exports = peopleService;