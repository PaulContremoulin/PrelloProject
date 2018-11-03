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
export function createBoard(name, idOrganization, desc, memberships, prefs) {
    return new Promise((resolve, reject) =>
    {
        postRequest( '/api/boards', {
            name: name,
            idOrganization: idOrganization,
            desc: desc,
            memberships: memberships,
            prefs: prefs,
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

