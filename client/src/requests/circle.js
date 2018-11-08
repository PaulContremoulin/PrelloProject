import {getRequest, postRequest, deleteRequest} from './genericRequest';

/**
*
*/
export const createCircle = (
  userId,
  name
) => (
  postRequest( '/api/members/'+userId+'/circles?name='+name)
  .then( response => response )
  .catch( error => error.response )
)

export function getCirclesUser(idUser) {
    return new Promise((resolve, reject) =>
    {
        getRequest('/api/members/'+idUser+'/circles')
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const getBoardsCircle = (
    circleid
) => (
    getRequest( '/api/circles/'+circleid)
        .then( response => response )
        .catch( error => error.response )
)

export const deleteBoardCircle = (
    circleId,
    boardId
) => (
    deleteRequest( '/api/circles/'+circleId+'/boards/'+boardId)
        .then( response => response )
        .catch( error => error.response )
)

export const deleteCircleRequest = (
    circleId
) => (
    deleteRequest( '/api/circles/'+circleId)
        .then( response => response )
        .catch( error => error.response )
)

export const addBoardCircle = (
    boardId,
    circleId,
) => (
    postRequest( '/api/circles/'+circleId+'/boards?idBoard='+boardId)
        .then( response => response )
        .catch( error => error.response )
)