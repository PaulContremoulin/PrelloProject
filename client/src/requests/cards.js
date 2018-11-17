import { putRequest, postRequest, deleteRequest } from './genericRequest';

/**
 * @desc change card name
 * @param { String } cardId
 * @param { String } cardName
 * @return status code
 */
export function changeCardName(cardId, cardName) {
    return putRequest('/api/cards/' + cardId + '/?name=' + cardName)
}

/**
 * @desc change card description
 * @param { String } cardId
 * @param { String } cardDesc
 * @return status code
 */
export function changeCardDesc(cardId, cardDesc) {
    return putRequest('/api/cards/' + cardId + '/?desc=' + cardDesc)
}
/**
 * @desc change the completed status for the card
 * @param { String } cardId
 * @param { Boolean } value
 * @return status code
 */
export function cardDueDateCompleted(cardId, value) {
    return putRequest('/api/cards/' + cardId + '/?dueComplete=' + value)
}

/**
 * @desc change card due date
 * @param { String } cardId
 * @param { String } cardDueDate
 * @return status code
 */
export function changeCardDueDate(cardId, cardDueDate) {
    return putRequest('/api/cards/' + cardId + '/?due=' + cardDueDate)
}

/**
 * @desc change card closed
 * @param { String } cardId
 * @param { String } cardClosed
 * @return status code
 */
export function changeCardClosed(cardId, cardClosed) {
    return putRequest('/api/cards/' + cardId + '/?closed=' + cardClosed)
}
/**
 * @desc Delete a card
 * @param { String } cardId
 * @return status code
 */
export function deleteCardRequest(cardId) {
    return deleteRequest('/api/cards/' + cardId)
}
/**
 * @desc change card position
 * @param { String } cardId
 * @param { String } cardPos
 * @return status code
 */
export function changeCardPos(cardId, cardPos) {
    return putRequest('/api/cards/' + cardId + '/?pos=' + cardPos)
}
/**
 * @desc change card position and its list
 * @param { String } cardId
 * @param { String } cardPos
 * @param { String } idList
 * @return status code
 */
export function changeCardPosAndList(cardId, cardPos, idList) {
    return putRequest('/api/cards/' + cardId + '/?pos=' + cardPos + '&idList=' + idList)
}
/**
 * @desc add a member to a card
 * @param { String } cardId
 * @param { String } memberId
 * @return status code
 */
export function addMemberToCard(cardId, memberId) {
    return postRequest('/api/cards/' + cardId + '/idMembers?value=' + memberId )
}

/**
* Route not created yet
* @desc delete a member from a card
* @param { String } cardId
* @param { String } memberId
*/
export function deleteMemberFromCard(cardId, memberId) {
    return deleteRequest('/api/cards/' + cardId + '/members/' + memberId )
}
