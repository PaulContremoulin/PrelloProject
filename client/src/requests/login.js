import axios from 'axios';

/**
 * @desc log user to the database
 * @param { String } userName
 * @param { String } password
 * @return status code
 */

export const loginUser = (
    userName,
    password
) => (
    axios.post( '/api/login/', {
        userName,
        password,
    })
        .then( response => response.data )
)
