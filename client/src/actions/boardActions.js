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
export const EDIT_INFORMATION_BOARD = "EDIT_INFORMATION_BOARD";
export const EDIT_STATE_BOARD = "EDIT_STATE_BOARD";
export const DELETE_CARD = "DELETE_CARD";
/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */

/**
 * @desc add a board to the lists of boards owned by the user
 * @param board
 * @return ADD_BOARD action
 */
export const addBoard =  (data) => {
    return {
        type: ADD_BOARD,
        board: data,
        meta: {
            socket: {
                channel: 'data:store',
                room: data._id,
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
    }
};

/**
 * @desc Setup all the informations for the board page
 * @param board
 * @return SET_BOARD action
 */
export const setBoard = (board) => {
    return {
        type: SET_BOARD,
        board
    }
};

export const editInformationsBoard = (board) => {
    return {
        type:EDIT_INFORMATION_BOARD,
        board
    }
}

export const changeStateBoard = (state) => {
    return {
        type: EDIT_STATE_BOARD,
        state
    }
}

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
 * @desc Add a list to the current board
 * @param list
 * @return ADD_LIST action
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
              channel: 'data:store',
              room: list.idBoard,
          }
      }
  }
};

/**
 * @desc Add a card to the current board
 * @param card
 * @return ADD_CARD action
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
              channel: 'data:store',
              room: card.idBoard,
          }
      }
  }
};

/**
 * @desc Delete a card from the current board
 * @param card
 * @return DELETE_CARD action
 */
export const deleteCard = (card) => {
    return {
        type: DELETE_CARD,
        list: {
            id: card.idList
        },
        card: {
            id: card.id
        },
        meta: {
            socket: {
                channel: 'data:store',
                room: card.idBoard,
            }
        }
    }
};

/**
 * @desc Move a list inside the board
 * @param lists
 * @return MOVE_LIST action
 */
export const moveList = (lists) => {
  return {
      type: MOVE_LIST,
      lists,
      meta: {
          socket: {
              channel: 'data:store',
              room: lists[0].idBoard,
          }
      }
  }
};


/**
 * @desc Move a card inside a list
 * @param list, indexOfList
 * @return MOVE_CARD action
 */
export const moveCard = (list, indexOfList) => {
  return {
      type: MOVE_CARD,
      list,
      indexOfList,
      meta: {
          socket: {
              channel: 'data:store',
              room: list.idBoard,
          }
      }
  }
};

/**
 * @desc Move a card from a list to another
 * @param startList, indexStart, endList, indexEnd
 * @return MOVE_CARD_FROM_LIST action
 */
export const moveCardFromList = (startList, indexStart, endList, indexEnd) => {=
  return {
      type: MOVE_CARD_FROM_LIST,
      startList: startList,
      endList: endList,
      indexStart,
      indexEnd,
      meta: {
          socket: {
              channel: 'data:store',
              room: startList.idBoard
          }
      }
  }
};
