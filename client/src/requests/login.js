import axios from 'axios';
import {setLogin} from "../actions/signActions";

/**
 * @desc log user to the database
 * @param { String } username
 * @param { String } password
 * @return status code
 */

export const loginUser = (
    username,
    password
) => (
    axios.post( process.env.API_URL + '/api/login/', {
        username,
        password,
    })
        .then( response => setLogin(response.data) )
)
