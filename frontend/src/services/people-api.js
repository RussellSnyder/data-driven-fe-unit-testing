const endpoint = 'http://localhost:3001/api/people'

export const getPeople = async (queryParamsArray) => {
    const url = queryParamsArray 
        ? `${endpoint}?${queryParamsArray.join('&')}`
        : endpoint

    let res

    try {
        res = await fetch(url);
    } catch(e) {
        console.log(e)
    }

    try {
        return await res.json();
    } catch(e) {
        console.log(e)
    }
    
}