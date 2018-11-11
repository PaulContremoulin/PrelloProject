import {putRequest} from "./genericRequest";

export const changePasswordUser = (
    oldPassword,
    newPassword,
    idUser
) => ( putRequest( '/api/members/'+idUser+'/password', {oldPassword, newPassword})
        .then( response => response )
        .catch(err => err.response)
)