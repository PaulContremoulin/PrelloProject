import { postRequest } from './genericRequest';
/**
* @desc add a new user to the database
* @param { String } username
* @param { String } firstName
* @param { String } lastName
* @param { email } email
* @param { String } password
 * @param {String} organization
 * @param {String} callback
* @return status code
*/
export const registerUser = (
  username,
  firstName,
  lastName,
  email,
  password,
  organization,
  callback
) => ( postRequest( '/api/signup/', {username, firstName, lastName, email, password, organization, callback})
  .then( response => response )
      .catch(err => err.response)
)
