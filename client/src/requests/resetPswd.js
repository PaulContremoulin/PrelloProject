import { postRequest } from './genericRequest';

export const resetPswd = (
  email
) => (
  postRequest( '/auth/login/forgot/password', {
    email
  })
  .then( response => console.log(response) || response.data )
)



