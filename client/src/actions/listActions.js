// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
 export const LIST_SET_NAME = 'LIST_SET_NAME';

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */


/**
* @desc
*/
export const setListName = (idList, name) => {
  return {
      type: LIST_SET_NAME,
      list: {
        id: idList,
        name,
      }
  }
};
