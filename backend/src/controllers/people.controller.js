const peopleService = require('../services/people.service')

class PeopleController {
    queryParamsOptions = {
        isRegistered: [true, false],
        hasImage: [true, false],
    }

    async getPeople(req, res) {
        const query = req ? req.query : undefined;

        if (!query || Object.keys(query).length === 0) {
            const people = await peopleService.getAllPeople();
            res.send(JSON.stringify(people));
            return;
        }

        const parsedQuery = parseQueryParams(query);
        
        console.log({ parsedQuery });

        if (Object.keys(parsedQuery).length) {
            const people = await peopleService.getAllPeople(parsedQuery);
            res.send(JSON.stringify(people));
            return;
        }

        res.status(400).send(`Could no understand query ${JSON.stringify(query)}`);
    };

    parseQueryParams(rawQuery) {
        const parsedQuery = {};
    
        const {
            isRegistered: rawIsRegistered,
            hasImage: rawHasImage
        } = rawQuery;
        
        let isRegistered = rawIsRegistered === 'true' ? true : undefined;
        isRegistered = rawIsRegistered === 'false' ? false : isRegistered;
        if (isRegistered !== undefined) {
            parsedQuery.isRegistered = isRegistered
        }
    
        let hasImage = rawHasImage === 'true' ? true : undefined;
        hasImage = rawHasImage === 'false' ? false : hasImage;
        if (hasImage !== undefined) {
            parsedQuery.hasImage = hasImage;
        }
    
        return parsedQuery;    
    }
}



const peopleController = new PeopleController();

module.exports = peopleController;