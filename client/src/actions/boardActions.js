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
export const SET_BOARD_MEMBERS = "SET_BOARD_MEMBERS";
export const ADD_MEMBER = "ADD_MEMBER";
export const EDIT_ROLE_MEMBER = "EDIT_ROLE_MEMBER";

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

export const setBoardMembers = (listMembers) => {
    return {
        type: SET_BOARD_MEMBERS,
        listMembers
    }
}

export const addMemberAction = (member) => {
    return {
        type: ADD_MEMBER,
        member
    }
}

export const editRoleMember = (member) => {
    return {
        type: EDIT_ROLE_MEMBER,
        member
    }
}



/**
 * @desc
 */
export const addList = (list) => {
  return {
      type: ADD_LIST,
      list: {
        id: list._id,
        name: list.name,
        closed: list.closed,
        idBoard: list.idBoard,
        pos: list.pos,
        subscribed: false,
        cards: []
      },
      meta: {
          socket: {
              channel: 'data:store'
          }
      }
  }
};

/**
 * @desc
 */
export const addCard = (card) => {
  return {
      type: ADD_CARD,
      card: {
        id: card._id,
        _id: card._id,
        name: card.name,
        closed: card.closed,
        desc: card.desc,
        due: card.due,
        dueComplete: card.dueComplete,
        pos: card.pos,
        idList: card.idList,
        idBoard: card.idBoard,
        idMembers: card.idMembers,
        idLabels: card.idLabels,
      },
      meta: {
          socket: {
              channel: 'data:store'
          }
      }
  }
};


/**
 * @desc
 */
export const moveList = (lists) => {
  return {
      type: MOVE_LIST,
      lists,
      meta: {
          socket: {
              channel: 'data:store'
          }
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
      meta: {
          socket: {
              channel: 'data:store'
          }
      }
  }
};

/**
 * @desc
 */
export const moveCardFromList = (startList, indexStart, endList, indexEnd) => {
  // console.log(startList);
  // console.log(endList);
  // console.log(indexStart, indexEnd);
  return {
      type: MOVE_CARD_FROM_LIST,
      startList: startList,
      endList: endList,
      indexStart,
      indexEnd,
      meta: {
          socket: {
              channel: 'data:store'
          }
      }
  }
};
