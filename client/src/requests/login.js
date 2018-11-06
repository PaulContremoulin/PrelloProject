import { postRequest } from './genericRequest';

/**
 * @desc check if the user can be connect
 * @param { String } username
 * @param { String } password
 * @return status code
 */

export function loginUser(username, password) {
    return new Promise((resolve, reject) =>
    {
        postRequest( '/api/login/', {
            username,
            password,
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
