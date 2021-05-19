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
            res.send({
                status: 200,
                data: people
            });
            return;
        }

        const parsedQuery = parseQueryParams(query);

        if (Object.keys(parsedQuery).length) {
            const people = await peopleService.getAllPeople(parsedQuery);
            res.send({
                status: 200,
                data: people
            });
            return;
        }

        res.send({
            status: 400,
            error: `Could no understand query '${Object.keys(query).join(', ')}'`
        });
    };

}

const parseQueryParams = (rawQuery) => {
    const parsedQuery = {};

    const { isRegistered, hasImage, ...unsupported } = rawQuery;

    if (Object.keys(unsupported).length) {
        return parsedQuery;
    }
    
    if (parseBooleanString(isRegistered) !== undefined) {
        parsedQuery.isRegistered = parseBooleanString(isRegistered)
    }

    if (parseBooleanString(hasImage) !== undefined) {
        parsedQuery.hasImage = parseBooleanString(hasImage);
    }

    return parsedQuery;    
}

const parseBooleanString = (booleanOrBooleanString) => {
    if (typeof booleanOrBooleanString === 'boolean') {
        return booleanOrBooleanString;
    }
    if (booleanOrBooleanString === 'true') {
        return true;
    }
    if (booleanOrBooleanString === 'false') {
        return false;
    }
}

const peopleController = new PeopleController();

module.exports = peopleController;