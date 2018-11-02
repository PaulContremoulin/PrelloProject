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
  axios.post( process.env.API_URL+'/api/signup/', {
    username,
    firstName,
    lastName,
    email,
    password,
  })
  .then( response => response.data )
)



export function signInGithub() {
    axios.get(process.env.REACT_APP_API_URL + '/api/auth/github')
}
