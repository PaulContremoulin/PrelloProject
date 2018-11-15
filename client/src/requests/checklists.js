import { putRequest, getRequest, postRequest, deleteRequest } from './genericRequest';


  export function postChecklistToCard(checklistName, idCard, idBoard) {
      return postRequest('/api/cards/' + idCard + '/checklists', {
        name: checklistName,
        pos: 0,
        idCard: idCard,
        idBoard: idBoard,
        checkItems: []
      })
  }

  export function putChecklist(idChecklist, nameChecklist = "", posChecklist = "") {
    var queryStr = '';
    if (nameChecklist && posChecklist) { queryStr = '?name=' + nameChecklist + '&pos=' + posChecklist }
    else if (nameChecklist) { queryStr = '?name=' + nameChecklist }
    else if (posChecklist) { queryStr = '?pos=' + posChecklist }
    return putRequest('/api/checklists/' + idChecklist + queryStr)
  }

  export function postCheckitemToCard(checkItemName, idChecklist) {
      return postRequest('/api/checklists/' + idChecklist + "/checkItems", {
        name: checkItemName,
        pos: 0,
        idChecklist: idChecklist,
        state: "incomplete",
      })
  }

  export function getChecklists(idCard) {
      return getRequest('/api/cards/' + idCard + '/checklists')
  }

export function deleteCecklist(idChecklist) {
    return deleteRequest('/api/checklists/' + idChecklist )
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
