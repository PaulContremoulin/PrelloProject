import { postRequest } from './genericRequest';
import { axios } from 'axios';
/**
* @desc add a new user to the database
* @param { String } username
* @param { String } firstName
* @param { String } lastName
* @param { email } email
* @param { String } password
 * @param {String} organisation
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



export function signInGithub() {
    axios.get(process.env.REACT_APP_API_URL + '/api/auth/github')
}
