import { postRequest } from './genericRequest';

/**
 * @desc check if the user can be connect
 * @param { String } username
 * @param { String } password
 * @return status code
 */

export const loginUser = (
    username,
    password,
) => ( postRequest( '/api/login/', {username, password})
        .then( response => response )
        .catch(err => err.response)
)