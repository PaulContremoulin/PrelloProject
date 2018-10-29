import axios from 'axios';

/**
* @desc add a new user to the database
* @param { String } userName
* @param { String } firstName
* @param { String } lastName
* @param { String } email
* @param { String } password
* @return status code
*/
export const registerUser = (
  username,
  firstName,
  lastName,
  email,
  password
) => (
  axios.post( '/api/signup/', {
    username,
    firstName,
    lastName,
    email,
    password,
  })
  .then( response => response.data )
)
