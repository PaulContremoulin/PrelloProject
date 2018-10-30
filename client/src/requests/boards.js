import axios from 'axios';

/**
 * @desc create a new board in the database
 * @param { String } name
 * @param { String } color
 * @return status code
 */

export const createBoard = (
    name,
    color
) => (
    axios.post( process.env.API_URL + '/api/login/', {
        name,
        color,
    })
        .then( response => response.data )
)
