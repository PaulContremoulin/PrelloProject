import { putRequest, postRequest } from './genericRequest';


  export function postChecklistToCard(checklistName, idCard, idBoard) {
      return postRequest('/api/checklists/', {
        name: checklistName,
        pos: 0,
        idCard: idCard,
        idBoard: idBoard,
        checkItems: []
      })
  }

  /*
  * @property {string} name.required - the checklist's name
  * @property {number} pos - the checklist's pos
  * @property {number} pos.required - the checklist's pos
  * @property {string} idCard - the checklist's card attached
  * @property {string} idBoard - the checklist's board attached
  * @property {Array.<CheckItem>} checkItems - the list of checkItems to do
  */
