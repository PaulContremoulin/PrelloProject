import { putRequest, deleteRequest } from './genericRequest';

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

export function deleteCardRequest(cardId) {
    return deleteRequest('/api/cards/' + cardId)
}


export function changeCardPos(cardId, cardPos) {
    return putRequest('/api/cards/' + cardId + '/?pos=' + cardPos)
}

export function changeCardPosAndList(cardId, cardPos, idList) {
    return putRequest('/api/cards/' + cardId + '/?pos=' + cardPos + '&idList=' + idList)
}

