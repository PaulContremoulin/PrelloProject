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
 * @desc
 */
 export const resetComments = () => {
   return {
       type: RESET_COMMENTS,
   }
 };

 /**
 * @desc
 */
 export const setComments = (comments) => {
   return {
       type: SET_COMMENTS,
       comments,
   }
 };

 /**
 * @desc
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
* @desc
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
