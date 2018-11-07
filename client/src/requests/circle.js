import {getRequest, postRequest} from './genericRequest';

/**
*
*/
export const addCircleToDB = (
  userId,
  circleName
) => (
  postRequest( '/api/circle/', {
    userId,
    circleName
  })
  .then( response => response.data )
      /*
  .catch( error => {code: error.code, message: error.message} )
  */
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

export function createCircle() { //TODO : precise what a circle need
    return new Promise((resolve, reject) =>
    {
        postRequest( '/api/circles', { // val: var
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}