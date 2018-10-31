import axios from 'axios';
import {setLogin} from "../actions/signActions";

/**
 * @desc log user to the database
 * @param { String } username
 * @param { String } password
 * @return status code
 */

export function loginUser(username, password) {
    const data = {
        isError : '',
        result : ''
    };
    axios.post( process.env.API_URL + '/api/login/', {
        username,
        password,
    })
        .then( response => {
            data.isError = true;
            data.result = response.data;
            return data;
        })
        .catch( error => {
            data.isError = false;
            data.result = error;
            return data;
        })
}
