// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
 export const LIST_SET_NAME = 'LIST_SET_NAME';
 export const LIST_SET_CLOSED = 'LIST_SET_CLOSED';
 export const LIST_DELETE = 'LIST_DELETE';

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */


 /**
  * @desc Change the name of a list
  * @param idList, name, idBoard
  * @return LIST_SET_NAME action
  */
export const setListName = (idList, name, idBoard) => {
  return {
      type: LIST_SET_NAME,
      list: {
        id: idList,
        name,
      },
      meta: {
          socket: {
              channel: 'data:store',
              room: idBoard,
          }
      }
  }
};

/**
 * @desc Change the archived status of a list
 * @param idList, closed, idBoard
 * @return LIST_SET_CLOSED action
 */
export const setListClosed = (idList, closed, idBoard) => {
  return {
    type: LIST_SET_CLOSED,
    list: {
      id: idList,
      closed,
    },
    meta: {
        socket: {
            channel: 'data:store',
            room: idBoard,
        }
    }
  }
};

/**
 * @desc Delete a list from the board
 * @param idList, idBoard
 * @return LIST_DELETE action
 */
export const deleteList = (idList, idBoard) => {
  return {
    type: LIST_DELETE,
    list: {
      id: idList,
    },
    meta: {
        socket: {
            channel: 'data:store',
            room: idBoard,
        }
    }
  }
};
