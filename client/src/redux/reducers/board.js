// Modules
import { combineReducers } from 'redux';

// Actions & constants
/**
* Action types are exported from the action source file
* It's the best place to avoid circular dependencies
*/
// import { list } from './list';

import { DEFAULT_BOARD } from '../../constants';

import { SET_BOARD, ADD_LIST, MOVE_LIST, ADD_CARD, MOVE_CARD } from '../../actions/boardActions';


/******************************************************************************/
/******************************* Board REDUCERS ********************************/
/******************************************************************************/
/**
* Reducers
* Reducer specification are always the same
* @param { Object } state, previous redux store state or sub state
* @param { Object } action, action with an action type
* @return the new state or sub state
*
*   If a reducer is to big, you should try to break it into smaller reducers
*   those reducers will manage sub states of this reducer state
*
*   Reducer are pure functions
*   they should never modify the passed state object,
*   they should never call unpure functions as well
*
*   If a reducer happened to ignore the given action,
*   it should return the given previous state,
*   if the given previous state is undefined, you should initialize it
*/

// boardId reducer
const boardId = ( state = DEFAULT_BOARD.boardId, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.boardId ;
    default:
      return state ;
  }
};

// boardName reducer
const boardName = ( state = DEFAULT_BOARD.boardName, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.boardName ;
    default:
      return state ;
  }
}

// color reducer
const color = ( state = DEFAULT_BOARD.color, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.color ;
    default:
      return state ;
  }
};

/// creator reducer
const creator = ( state = DEFAULT_BOARD.creator, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.creator ;
    default:
      return state ;
  }
};

// boardTeam reducer
const boardTeam = ( state = DEFAULT_BOARD.boardTeam, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.boardTeam ;
    default:
      return state ;
  }
};

// guests reducer
const guests = ( state = DEFAULT_BOARD.guests, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.guests ;
    default:
      return state ;
  }
};

// lists reducer
const lists = ( state = DEFAULT_BOARD.lists, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.lists ;
    case ADD_LIST :
      return [
        ...state,
        {
          listName: action.list.listName,
          cards: []
        }
      ];
    case ADD_CARD :
      return state.map(
        // list => (list.listId === action.list.listId) ? list( list, action ) : list
        list => (list.listId === action.list.listId) ? { ...list, cards: [...list.cards, action.card] } : list
      );
    case MOVE_CARD : // cardId, listId, indexOfcard
    return state.map(
      (list, index) => (index == action.indexOfList) ? action.list : list
    )
    default:
      return state ;
  }
};

// tags reducer
const tags = ( state = DEFAULT_BOARD.tags, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.tags ;
    default:
      return state ;
  }
};


// combineReducers is a redux function which associate object key with a reducers
// It return a reducer responsible for this sub-state
// combineReducers got others untold subtilities
export const board = combineReducers({
  boardId,
  boardName,
  color,
  creator,
  boardTeam,
  guests,
  lists,
  tags,
});
