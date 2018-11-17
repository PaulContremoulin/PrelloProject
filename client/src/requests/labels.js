import { putRequest, getRequest, postRequest, deleteRequest } from './genericRequest';

export function postLabel(boardId, labelName, labelColor) {
  return postRequest('/api/boards/' + boardId + '/labels?name=' + escape(labelName) + '&color=' + escape(labelColor))
}

export function putLabel(labelId, labelName = "", labelColor = "") {
  var queryStr = '';
  if (labelName && labelColor) { queryStr = '?name=' + labelName + '&color=' + labelColor }
  else if (labelName) { queryStr = '?name=' + labelName }
  else if (labelColor) { queryStr = '?color=' + labelColor }
  return putRequest('/api/labels/' + labelId + queryStr)
}

export function deleteLabel(labelId) {
  return deleteRequest('/api/labels/' + labelId )
}

export function getLabel( labelId ) {
  return getRequest('/api/labels/' + labelId )
}

export function removeLabelFromCard( labelId, cardId ) {
  return deleteRequest('/api/cards/' + cardId + '/idlabels/' + labelId )
}

export function postLabelToCard( labelId, cardId ) {
  return postRequest('/api/cards/' + cardId + '/idlabels?value=' + labelId)
}
