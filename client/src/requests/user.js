import {putRequest, deleteRequest} from "./genericRequest";

export const changePasswordUser = (
    oldPassword,
    newPassword,
    idUser
) => ( putRequest( '/api/members/'+idUser+'/password', {oldPassword, newPassword})
        .then( response => response )
        .catch(err => err.response)
)

export const deleteAccount = (
    idUser
) => (deleteRequest('/api/members/'+idUser)
        .then(response => response)
        .catch(err => err.response)
)

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