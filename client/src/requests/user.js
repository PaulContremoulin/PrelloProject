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