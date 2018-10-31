import axios from 'axios';
import {setLogin} from "../actions/signActions";

/**
 * @desc log user to the database
 * @param { String } username
 * @param { String } password
 * @return status code
 */

export function loginUser(username, password) {
    return new Promise((resolve, reject) =>
    {
        axios.post(process.env.API_URL + '/api/login/', {
            username,
            password,
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