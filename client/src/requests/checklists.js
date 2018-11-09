import { putRequest, getRequest, postRequest } from './genericRequest';


  export function postChecklistToCard(checklistName, idCard, idBoard) {
      return postRequest('/api/cards/' + idCard + '/checklists', {
        name: checklistName,
        pos: 0,
        idCard: idCard,
        idBoard: idBoard,
        checkItems: []
      })
  }

  export function postCheckitemToCard(checklistName, idCard, idBoard) {
      return postRequest('/api/checklists/', {
        name: checklistName,
        pos: 0,
        idCard: idCard,
        idBoard: idBoard,
        checkItems: []
      })
  }

  export function getChecklists(idCard) {
      return getRequest('/api/cards/' + idCard + '/checklists')
  }

  /*
  * @property {string} name.required - the checklist's name
  * @property {number} pos - the checklist's pos
  * @property {number} pos.required - the checklist's pos
  * @property {string} idCard - the checklist's card attached
  * @property {string} idBoard - the checklist's board attached
  * @property {Array.<CheckItem>} checkItems - the list of checkItems to do
  */

/*
checkItems: [{
        "state": "complete",
        "id": "4eea6aeda5da7f5a490000b9",
        "idChecklist": "4554132168484894528",
        "name": "See if there is a call",
        "pos": 16751
    }]
*/
