import { postRequest, getRequest } from './genericRequest';

/**
 * @desc change password of the user in the database
 * @param { String } tokenUser
 * @param { String } password
 * @param { String } iduser
 * @return status code
 */
export const changePswd = (
    tokenUser,
    password,
    iduser,
) => (
    postRequest('/api/members/'+iduser+'/password/reset?token='+tokenUser, {password})
        .then( response => response )
        .catch(err => err.response)
);

/**
 * @desc check if the token is valid
 * @param { String } tokenUser
 * @param { String } iduser
 * @return status code
 */
export const checkToken = (
    tokenUser,
        iduser,
) => (
    getRequest('/api/members/'+iduser+'/password/reset?token='+tokenUser)
        .then( response => response )
        .catch(err => err.response)
);

/**
 * @desc send a email to reset password
 * @param { String } email
 * @param { String } callback
 * @return status code
 */
export const resetPswd = (
  email,
  callback
) => (
  postRequest('/api/auth/forgot/password', {email, callback})
      .then( response => response )
      .catch(err => err.response)
);



