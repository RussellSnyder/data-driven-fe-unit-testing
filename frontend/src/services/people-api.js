const endpoint = 'http://localhost:3000/api/people'

export const getPeople = async () => {
    const res = await fetch(endpoint);
    const people = res.json();

    return people;
}

export const getPeopleByRegistrationStatus = async (isRegistered) => {
    const res = await fetch(`${endpoint}?isRegistered=${isRegistered}`);
    const people = res.json();

    return people;
}