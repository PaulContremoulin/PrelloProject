import { putRequest, getRequest, deleteRequest } from './genericRequest';

/**
 * @desc Change the name of a list
 * @param { String } listId
 * @param { String } listName
 * @return status code
 */
  export function changeListName(listId, listName) {
      return putRequest('/api/lists/' + listId + '/name?value=' + listName)
  }
  /**
   * @desc  Change the pos of a list
   * @param { String } listId
   * @param { String } listpos
   * @return status code
   */
  export function changeListPos(listId, listPos) {
      return putRequest('/api/lists/' + listId + '/pos?value=' + listPos)
  }
  /**
   * @desc Change the archived status of a list
   * @param { String } idUser
   * @param { Boolean } listClosed
   * @return status code
   */
  export function changeListClosed(listId, listClosed) {
      return putRequest('/api/lists/' + listId + '/closed?value=' + listClosed)
  }
  /**
   * @desc delete a list from a board
   * @param { String } listId
   * @return status code
   */
  export function deleteListFromBoard(listId) {
      return deleteRequest('/api/lists/' + listId )
  }
