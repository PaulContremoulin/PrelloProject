import { putRequest, getRequest, postRequest, deleteRequest } from './genericRequest';


  export function postCommentToCard(text, idCard) {
      return postRequest('/api/cards/' + idCard + '/comments', { text })
  }

  export function putTextToComment(text, idCard) {
      return putRequest('/api/cards/' + idCard + '/comments', {
        text,
      })
  }

  export function getComments(idCard) {
      return getRequest('/api/cards/' + idCard + '/comments')
  }
