import { putRequest, getRequest, postRequest, deleteRequest } from './genericRequest';


/**
 * @desc Add a label to the board
 * @param { String } boardId
 * @param { String } labelName
 * @param { String } labelColor
 * @return status code
 */
export function postLabel(boardId, labelName, labelColor) {
  return postRequest('/api/boards/' + boardId + '/labels?name=' + escape(labelName) + '&color=' + escape(labelColor))
}

/**
 * @desc Change a label params
 * @param { String } labelId
 * @param { String } labelName
 * @param { String } labelColor
 * @return status code
 */
export function putLabel(labelId, labelName = "", labelColor = "") {
  var queryStr = '';
  if (labelName && labelColor) { queryStr = '?name=' + labelName + '&color=' + labelColor }
  else if (labelName) { queryStr = '?name=' + labelName }
  else if (labelColor) { queryStr = '?color=' + labelColor }
  return putRequest('/api/labels/' + labelId + queryStr)
}

/**
 * @desc delete a label from a board
 * @param { String } labelId
 * @return status code
 */
export function deleteLabel(labelId) {
  return deleteRequest('/api/labels/' + labelId )
}

/**
 * @desc get the label by id
 * @param { String } labelId
 * @return status code
 */
export function getLabel( labelId ) {
  return getRequest('/api/labels/' + labelId )
}

/**
 * @desc delete a label from a card
 * @param { String } labelId
 * @param { String } cardId
 * @return status code
 */
export function removeLabelFromCard( labelId, cardId ) {
  return deleteRequest('/api/cards/' + cardId + '/idlabels/' + labelId )
}

/**
 * @desc add a label to a card
 * @param { String } labelId
 * @param { String } cardId
 * @return status code
 */
export function postLabelToCard( labelId, cardId ) {
  return postRequest('/api/cards/' + cardId + '/idlabels?value=' + labelId)
}
