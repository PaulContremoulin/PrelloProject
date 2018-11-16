import { putRequest, getRequest } from './genericRequest';


  export function changeListName(listId, listName) {
      return putRequest('/api/lists/' + listId + '/name?value=' + listName)
  }

  export function changeListPos(listId, litsPos) {
      return putRequest('/api/lists/' + listId + '/pos?value=' + litsPos)
  }

  export function changeListClosed(listId, listClosed) {
      return putRequest('/api/lists/' + listId + '/closed?value=' + listClosed)
  }
