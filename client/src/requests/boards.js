import { postRequest, getRequest, putRequest } from './genericRequest';

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

/**
 * @desc get user boards according to the state
 * @param { String } idUser
 * @param { String } state
 * @return status code
 */
export function getBoardsUser(idUser, state) {
    return new Promise((resolve, reject) =>
    {
        getRequest( '/api/members/'+idUser+'/boards?closed='+state)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**
 * @desc get all user boards
 * @param { String } idUser
 * @return status code
 */
export function getAllBoardsUser(idUser) {
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

/**
 * @desc get members of boards
 * @param { String } idBoard
 * @return status code
 */
export function getMembersOfBoard(idBoard) {
    return getRequest('/api/boards/'+idBoard+'/members')
}

/**
 * @desc get board by id
 * @param { String } idBoard
 * @return status code
 */
export function getBoardById(idBoard) {
    return getRequest('/api/boards/' + idBoard)
        .then( res => res )
}

/**
 * @desc get lists of boards
 * @param { String } idBoard
 * @param { Boolean } withCards
 * @param { Boolean } archived
 * @return status code
 */
export function getListsOfBoard(idBoard, withCards = false, archived = false) {
    const cardsFilter = (withCards) ? "open" : "closed";
    return getRequest('/api/boards/' + idBoard + '/lists?cards=' + cardsFilter)
}

/**
 * @desc create list in board
 * @param { String } listName
 * @param { String } listPos
 * @param { String } boardId
 * @return status code
 */
export function postListToBoard(listName, listPos, boardId) {
    return postRequest('/api/boards/' + boardId + '/lists/', {
        name: listName,
        pos: listPos
    })
}

/**
 * @desc create card in board
 * @param { String } cardName
 * @param { String } cardPos
 * @param { String } listId
 * @param { String } boardId
 * @return status code
 */
export function postCardToBoard(cardName, cardPos, listId, boardId) {
    return postRequest('/api/cards/', {
        name: cardName,
        pos: cardPos,
        desc: "",
        due: "",
        dueComplete: false,
        idList: listId,
        idBoard: boardId,
        idMembers: [],
        idLabels: [],
    })
}

/**
 * @desc change information of board
 * @param { String } idBoard
 * @param { String } name
 * @param { String } desc
 * @param { String } closed
 * @return status code
 */
export const changeInformationBoard = (
    idBoard,
    name,
    desc,
    closed,
) => (putRequest('/api/boards/'+idBoard+'?name='+name+'&desc='+desc+'&closed='+closed)
        .then(response => response)
        .catch(err => err.response)
)
