// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
 export const FETCH_BOARD = 'FETCH_BOARD';
export const ADD_BOARD= "ADD_BOARD" ;
export const SET_BOARD= "SET_BOARD" ;
export const ADD_LIST= "ADD_LIST" ;
export const ADD_CARD= "ADD_CARD" ;
export const MOVE_LIST= "MOVE_LIST" ;
export const MOVE_CARD= "MOVE_CARD" ;
export const MOVE_CARD_FROM_LIST= "MOVE_CARD_FROM_LIST" ;

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */

/**
 * @desc add board
 * @param board
 * @return ADD_BOARD action
 */
export const addBoard =  (data) => {
    return {
        type: ADD_BOARD,
        board: data,
        meta: {
            socket: {
                channel: 'data:store'
            }
        }
    }
};

/**
 * @desc set all boards
 * @param boards
 * @return FETCH_BOARD action
 */
export const fetchBoards = (boards) => {
    return {
        type: FETCH_BOARD,
        boards,
        meta: {
            socket: {
                channel: 'data:store'
            }
        }
    }
};

/**
 * @desc
 * @param board
 * @return SET_BOARD action
 */
export const setBoard = (board) => {
    return {
        type: SET_BOARD,
        board
    }
};



/**
* @desc
*/
export const addList = (listName) => {
  return {
      type: ADD_LIST,
      list: {
        listName
      }
  }
};


/**
* @desc
*/
export const addCard = (cardName, listId) => {
  return {
      type: ADD_CARD,
      card: {
        cardName
      },
      list: {
        listId
      }
  }
};

/**
* @desc
*/
export const moveList = (listId, index) => {
  return {
      type: MOVE_LIST,
      list: {
        listId
      }
  }
};


/**
* @desc
*/
export const moveCard = (list, indexOfList) => {
  return {
      type: MOVE_CARD,
      list,
      indexOfList,
  }
};

/**
* @desc
*/
export const moveCardFromList = (cardId, index) => {
  return {
      type: MOVE_CARD_FROM_LIST,
      card: {
        cardId,
        index
      }
  }
};
