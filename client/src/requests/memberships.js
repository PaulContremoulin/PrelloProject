import { getRequest, putRequest, deleteRequest } from './genericRequest';

/**
 * @desc check if the user can be connect
 * @param { String } stringSearch
 * @return status code
 */

export const getMembersSearch = (
    stringSearch
) => ( getRequest( '/api/members/search/'+stringSearch)
        .then( response => response )
        .catch(err => err.response)
)

export const addMember = (
    idBoard,
    idUser,
    typeMember
) => ( putRequest( '/api/boards/'+idBoard+'/members/'+idUser+'?type='+typeMember)
        .then( response => response )
        .catch(err => err.response)
)

export const getMember = (
    idUser
) => (getRequest('/api/members/'+idUser+'/public')
        .then( response => response )
        .catch(err => err.response)
)

export const deleteMember = (
    idBoard,
        idMemberShip,
) => (deleteRequest('/api/boards/'+idBoard+'/members/'+idMemberShip)
        .then(response => response)
        .catch(err => err.response)
)