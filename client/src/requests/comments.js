import { putRequest, getRequest, postRequest } from './genericRequest';

/**
 * @desc add a comment to a card
 * @param { String } text
 * @param { String } idCard
 * @return status code
 */
  export function postCommentToCard(text, idCard) {
      return postRequest('/api/cards/' + idCard + '/comments', { text })
  }
  /**
   * @desc Change the text of a comment
   * @param { String } text
   * @param { String } idCard
   * @param { String } idComment
   * @return status code
   */
  export function putTextToComment(text, idCard, idComment) {
      return putRequest('/api/cards/' + idCard + '/comments/' + idComment, {
        text,
      })
  }
  /**
   * @desc get the comments for the selected card
   * @param { String } idCard
   * @return status code
   */
  export function getComments(idCard) {
      return getRequest('/api/cards/' + idCard + '/comments')
  }
