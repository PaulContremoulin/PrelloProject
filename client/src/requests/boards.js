import axios from 'axios';

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
        axios.post(process.env.REACT_APP_API_URL + '/api/boards', {
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
