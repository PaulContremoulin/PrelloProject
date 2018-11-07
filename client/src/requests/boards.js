import { postRequest, getRequest } from './genericRequest';

/**
 * @desc create a new boards in the database
 * @param { String } name
 * @param { String } idOrganization
 * @param { String } desc
 * @param {[String]} memberships
 * @param {{String}} prefs
 * @return status code
 */
export function createBoard(name, idOrganization, desc, memberships, prefs) {
    return new Promise((resolve, reject) =>
    {
        postRequest( '/api/boards', {
            name: name,
            idOrganization: idOrganization,
            desc: desc,
            memberships: memberships,
            prefs: prefs,
        })
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getBoardsUser(idUser) {
    return new Promise((resolve, reject) =>
    {
        getRequest( '/api/members/'+idUser+'/boards')
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

  // export function getBoardById(idBoard) {
  //   return getRequest('/api/boards/' + idBoard)
  //   .then( res => res )
  // }

  export function getListsOfBoard(idBoard, withCards = false, archived = false) {
      return getRequest('/api/boards/' + idBoard + '/lists/?cards=' + withCards)
  }
