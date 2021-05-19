const endpoint = 'http://localhost:3001/api/people'

export const getPeople = async (queryParamsArray) => {
    const url = queryParamsArray 
        ? `${endpoint}?${queryParamsArray.join('&')}`
        : endpoint

    const res = await fetch(url);
    const parsed = await res.json();
    return parsed;
}