import { postRequest } from './genericRequest';

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
  password,
  organisation = ""
) => (
  postRequest( '/api/signup/', {
    username,
    firstName,
    lastName,
    email,
    password,
    organisation
  })
  .then( response => response.data )
)
