import axios from 'axios';
import {addBoard} from '../actions/boardActions';

/**
 * @desc create a new boards in the database
 * @param { String } name
 * @param { String } color
 * @return status code
 */

export const createBoard = (
    name,
    color
) => (
    axios.post( process.env.API_URL + '/api/login/', {
        name,
        color,
    })
        .then( response => { addBoard(response.data) })
)
