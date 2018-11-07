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
    console.log(board);
    return {
        type: SET_BOARD,
        board
    }
};



/**
* @desc
*/
export const addList = (listName, boardId) => {
  return {
      type: ADD_LIST,
      list: {
        id: "" + Math.floor(Math.random() * Math.floor(99999)),
        name: listName,
        close: false,
        idBoard: boardId,
        pos: Math.floor(Math.random() * Math.floor(99999)),
        subscribed: false,
        cards: []
      }
  }
};

/**
* @desc
*/
export const addCard = (cardName, listId) => {
  console.log(cardName, listId);
  return {
      type: ADD_CARD,
      card: {
        id: "" + Math.floor(Math.random() * Math.floor(9999999999)),
        name: cardName,
        closed: false,
        desc: "",
        due: null,
        dueComplete: false,
        pos: Math.floor(Math.random() * Math.floor(9999999999)),
      },
      list: {
        id: listId
      }
  }
};

/**
* @desc
*/
export const moveList = (lists) => {
  return {
      type: MOVE_LIST,
      lists
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
export const moveCardFromList = (startList, indexStart, endList, indexEnd) => {
  console.log(startList);
  console.log(endList);
  console.log(indexStart, indexEnd);
  return {
      type: MOVE_CARD_FROM_LIST,
      startList: startList,
      endList: endList,
      indexStart,
      indexEnd
  }
};
