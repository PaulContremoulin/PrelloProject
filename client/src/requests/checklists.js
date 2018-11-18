import {putRequest, getRequest, postRequest, deleteRequest} from './genericRequest';

/**
 * @desc create checklist in card
 * @param { String } checklistName
 * @param { String } idCard
 * @param { String } idBoard
 * @return status code
 */
export function postChecklistToCard(checklistName, idCard, idBoard) {
    return postRequest('/api/cards/' + idCard + '/checklists', {
        name: checklistName,
        pos: 0,
        idCard: idCard,
        idBoard: idBoard,
        checkItems: []
    })
}

/**
 * @desc get checklist
 * @param { String } idCard
 * @return status code
 */
export function getChecklists(idCard) {
    return getRequest('/api/cards/' + idCard + '/checklists')
}

/**
 * @desc modify checklist
 * @param { String } idChecklist
 * @param { String } nameChecklist
 * @param { String } posChecklist
 * @return status code
 */
export function putChecklist(idChecklist, nameChecklist = "", posChecklist = "") {
    var queryStr = '';
    if (nameChecklist && posChecklist) {
        queryStr = '?name=' + nameChecklist + '&pos=' + posChecklist
    }
    else if (nameChecklist) {
        queryStr = '?name=' + nameChecklist
    }
    else if (posChecklist) {
        queryStr = '?pos=' + posChecklist
    }
    return putRequest('/api/checklists/' + idChecklist + queryStr)
}

/**
 * @desc create checkitem in card
 * @param { String } checkItemName
 * @param { String } idChecklist
 * @return status code
 */
export function postCheckitemToCard(checkItemName, idChecklist) {
    return postRequest('/api/checklists/' + idChecklist + "/checkItems", {
        name: checkItemName,
        pos: 0,
        idChecklist: idChecklist,
        state: "incomplete",
    })
}

/**
 * @desc modify state of checkitem
 * @param { String } idChecklist
 * @param { String } idCheckItem
 * @param { String } state
 * @return status code
 */
export function putItemState(idChecklist, idCheckItem, state) {
    return putRequest('/api/checklists/' + idChecklist + '/checkItems/' + idCheckItem + '?state=' + state)
}

/**
 * @desc delete checklist
 * @param { String } idChecklist
 * @return status code
 */
export function deleteChecklist(idChecklist) {
    return deleteRequest('/api/checklists/' + idChecklist)
}

/**
 * @desc delete checkitem
 * @param { String } idChecklist
 * @param { String } idCheckItem
 * @return status code
 */
export function deleteCheckItem(idChecklist, idCheckItem) {
    return deleteRequest('/api/checklists/' + idChecklist + /checkItems/ + idCheckItem)
}
