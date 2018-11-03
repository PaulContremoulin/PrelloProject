import { postRequest } from './genericRequest';

/**
 * @desc create a new boards in the database
 * @param { String } username
 * @param { String } name
 * @param { String } idOrganization
 * @param { String } desc
 * @param {[String]} memberships
 * @return status code
 */
export function createBoard(username, name, idOrganization, desc, memberships) {
    return new Promise((resolve, reject) =>
    {
        postRequest( '/api/boards', {
            username,
            name,
            idOrganization,
            desc,
            memberships,
        })
            .then(response => {
                const res = response.data
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}
