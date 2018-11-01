import axios from 'axios';

/**
 * @desc create a new boards in the database
 * @param { String } name
 * @param { String } color
 * @return status code
 */
export function createBoard(name, color) {
    return new Promise((resolve, reject) =>
    {
        axios.post(process.env.API_URL + '/api/boards', {
            name,
            color,
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
