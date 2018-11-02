import axios from 'axios';

/**
 * @desc create a new boards in the database
 * @param { String } tokenUser
 * @param { String } name
 * @param { String } color
 * @param { String } description
 * @return status code
 */
export function createBoard(tokenUser, name, color, description) {
    return new Promise((resolve, reject) =>
    {
        axios.post(process.env.API_URL + '/api/boards', {
            tokenUser,
            name,
            color,
            description,
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
