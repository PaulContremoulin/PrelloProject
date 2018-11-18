// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
 export const RESET_COMMENTS = 'RESET_COMMENTS';
 export const SET_COMMENTS = 'SET_COMMENTS';
 export const ADD_COMMENT = 'ADD_COMMENT';
 export const SET_TEXT_COMMENT = 'SET_TEXT_COMMENT';

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */

 /**
  * @desc Set the comments to their default value
  * @return RESET_COMMENTS action
  */
 export const resetComments = () => {
   return {
       type: RESET_COMMENTS,
   }
 };

 /**
  * @desc Setup the comments of the selected card
  * @param comments
  * @return SET_COMMENTS action
  */
 export const setComments = (comments) => {
   return {
       type: SET_COMMENTS,
       comments,
   }
 };

 /**
  * @desc Add a comment to the card
  * @param comment, idBoard
  * @return ADD_COMMENT action
  */
 export const addComment = (comment, idBoard) => {
   return {
       type: ADD_COMMENT,
       comment,
       meta: {
           socket: {
               channel: 'data:store',
               room: idBoard,
           }
       }
   }
 };

 /**
  * @desc Change the text of a comment
  * @param idComment, textComment, idBoard
  * @return SET_TEXT_COMMENT action
  */
export const setTextComment = (idComment, textComment, idBoard) => {
  return {
      type: SET_TEXT_COMMENT,
      comment: {
        id: idComment,
        text: textComment,
      },
      meta: {
          socket: {
              channel: 'data:store',
              room: idBoard,
          }
      }
  }
};
