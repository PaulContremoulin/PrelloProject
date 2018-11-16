import {putRequest, deleteRequest} from "./genericRequest";

/**
 * @desc change user password
 * @param { String } oldPassword
 * @param { String } newPassword
 * @param { String } idUser
 * @return status code
 */
export const changePasswordUser = (
    oldPassword,
    newPassword,
    idUser
) => ( putRequest( '/api/members/'+idUser+'/password', {oldPassword, newPassword})
        .then( response => response )
        .catch(err => err.response)
)

/**
 * @desc delete account
 * @param { String } idUser
 * @return status code
 */
export const deleteAccount = (
    idUser
) => (deleteRequest('/api/members/'+idUser)
        .then(response => response)
        .catch(err => err.response)
)

/**
 * @desc change user information
 * @param { String } idUser
 * @param { String } firstName
 * @param { String } lastName
 * @param { String } organization
 * @param { String } bio
 * @return status code
 */
export const changeInformationUser = (
    idUser,
    firstName,
    lastName,
    organization,
    bio
) => (putRequest('/api/members/'+idUser+'?lastName='+lastName+'&firstName='+firstName+'&organization='+organization+'&bio='+bio)
        .then(response => response)
        .catch(err => err.response)
)