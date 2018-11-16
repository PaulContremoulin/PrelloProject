import {getRequest, postRequest, deleteRequest} from './genericRequest';

/**
 * @desc create a circle
 * @param { String } userId
 * @param { String } name
 * @return status code
 */
export const createCircle = (
  userId,
  name
) => (
  postRequest( '/api/members/'+userId+'/circles?name='+name)
  .then( response => response )
  .catch( error => error.response )
)

/**
 * @desc get circles user
 * @param { String } idUser
 * @return status code
 */
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

/**
 * @desc get boards from a circle
 * @param { String } circleid
 * @return status code
 */
export const getBoardsCircle = (
    circleid
) => (
    getRequest( '/api/circles/'+circleid)
        .then( response => response )
        .catch( error => error.response )
)

/**
 * @desc delete board in a circle
 * @param { String } circleId
 * @param { String } boardId
 * @return status code
 */
export const deleteBoardCircle = (
    circleId,
    boardId
) => (
    deleteRequest( '/api/circles/'+circleId+'/boards/'+boardId)
        .then( response => response )
        .catch( error => error.response )
)

/**
 * @desc delete a circle
 * @param { String } circleId
 * @return status code
 */
export const deleteCircleRequest = (
    circleId
) => (
    deleteRequest( '/api/circles/'+circleId)
        .then( response => response )
        .catch( error => error.response )
)

/**
 * @desc add a board in a circle
 * @param { String } boardId
 * @param { String } circleId
 * @return status code
 */
export const addBoardCircle = (
    boardId,
    circleId,
) => (
    postRequest( '/api/circles/'+circleId+'/boards?idBoard='+boardId)
        .then( response => response )
        .catch( error => error.response )
)