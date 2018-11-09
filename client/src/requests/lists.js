import { putRequest, getRequest } from './genericRequest';


  export function changeListName(listId, listName) {
      return putRequest('/api/lists/' + listId + '/name?value=' + listName)
  }
