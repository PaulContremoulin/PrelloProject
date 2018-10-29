import axios from 'axios';

/**
 * @desc log user to the database
 * @param { String } username
 * @param { String } password
 * @return status code
 */

export const loginUser = (
    username,
    password
) => (
    axios.post( process.env.API_URL + '/api/login/', {
        username,
        password,
    })
        .then( response => response.data )
)
