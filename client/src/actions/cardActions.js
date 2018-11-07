// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
 export const CARD_SET_NAME = 'CARD_SET_NAME';
 export const CARD_SET_DESC = 'CARD_SET_DESC';
 export const CARD_SET_DUE = 'CARD_SET_DUE';
 export const CARD_SET_CLOSED = 'CARD_SET_CLOSED';
 // export const CARD_CHANGE_NAME = 'CARD_CHANGE_NAME';

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */


/**
* @desc
*/
export const setName = (idList, idCard, name) => {
  return {
      type: CARD_SET_NAME,
      list: {
        id: idList
      },
      card: {
        id: idCard,
        name
      }
  }
};
