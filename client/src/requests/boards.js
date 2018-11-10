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

export function getMembersOfBoard(idBoard) {
    return getRequest('/api/boards/'+idBoard+'/members')
}

  export function getBoardById(idBoard) {
    return getRequest('/api/boards/' + idBoard)
    .then( res => res )
  }

  export function getListsOfBoard(idBoard, withCards = false, archived = false) {
      const cardsFilter = (withCards) ? "open" : "closed";
      return getRequest('/api/boards/' + idBoard + '/lists/?cards=' + cardsFilter)
  }

  export function postListToBoard(listName, boardId) { // TODO: Generate Position
      return postRequest('/api/boards/' + boardId + '/lists/', {
        name: listName,
        pos: 0
      })
  }

  export function postCardToBoard(cardName, listId, boardId) { // TODO: Generate Position
      return postRequest('/api/cards/', {
        name: cardName,
        pos: 0,
        desc: "",
        due: "",
        dueComplete: false,
        idList: listId,
        idBoard: boardId,
        idMembers: [],
        idLabels: [],
      })
  }
