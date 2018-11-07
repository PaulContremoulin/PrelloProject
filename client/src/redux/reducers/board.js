// Modules
import { combineReducers } from 'redux';

// Actions & constants
/**
* Action types are exported from the action source file
* It's the best place to avoid circular dependencies
*/
// import { list } from './list';

import { DEFAULT_BOARD } from '../../constants';

import { SET_BOARD, ADD_LIST, MOVE_LIST, ADD_CARD, MOVE_CARD, MOVE_CARD_FROM_LIST } from '../../actions/boardActions';
import { CARD_SET_NAME, CARD_SET_DESC, CARD_SET_CLOSED, CARD_SET_DUE } from '../../actions/cardActions';


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
const _id = ( state = DEFAULT_BOARD._id, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board._id ;
    default:
      return state ;
  }
};

// boardName reducer
const name = ( state = DEFAULT_BOARD.name, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.name ;
    default:
      return state ;
  }
}

// color reducer
const idOrganization = ( state = DEFAULT_BOARD.idOrganization, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.idOrganization ;
    default:
      return state ;
  }
};

/// creator reducer
const desc = ( state = DEFAULT_BOARD.desc, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.desc ;
    default:
      return state ;
  }
};

// boardTeam reducer
const closed = ( state = DEFAULT_BOARD.closed, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.closed ;
    default:
      return state ;
  }
};

// guests reducer
const memberships = ( state = DEFAULT_BOARD.memberships, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.memberships ;
    default:
      return state ;
  }
};

// lists reducer
const lists = ( state = DEFAULT_BOARD.lists, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.lists || [] ;
    case ADD_LIST :
      return [
        ...state,
        {
          ...action.list
        }
      ];
    case ADD_CARD :
      return state.map(
        list => (list.id === action.list.id) ? { ...list, cards: [...list.cards, action.card] } : list
      );
    case MOVE_CARD : // StartingList, indexOfList
      return state.map(
        (list, index) => (index == action.indexOfList) ? action.list : list
      )
    case MOVE_CARD_FROM_LIST : // startList, indexStart, endList, indexEnd
      return state.map(
        (list, index) => (index == action.indexStart) ? action.startList : (index == action.indexEnd) ? action.endList : list
      )
    case MOVE_LIST : //
      return action.lists
    case CARD_SET_NAME :
    case CARD_SET_DUE :
    case CARD_SET_DESC :
    case CARD_SET_CLOSED :
      return state.map(
        (list, index) => !(list.id == action.list.id) ? list :
        {
          ...list,
          cards: list.cards.map(
            (cardObj, index) => card( cardObj, action )
          )
        }
      )
    default:
      return state ;
  }
};

const card = ( state = {}, action ) => {
  switch (action.type) {
  case CARD_SET_NAME :
    return (action.card.id === state.id ) ? { ...state, name: action.card.name } : state
  case CARD_SET_DUE :
    return (action.card.id === state.id ) ? { ...state, name: action.card.due } : state
  case CARD_SET_DESC :
    return (action.card.id === state.id ) ? { ...state, name: action.card.desc } : state
  case CARD_SET_CLOSED :
    return (action.card.id === state.id ) ? { ...state, name: action.card.closed } : state
  default:
    return state ;
  }
}


// combineReducers is a redux function which associate object key with a reducers
// It return a reducer responsible for this sub-state
// combineReducers got others untold subtilities
export const board = combineReducers({
  _id,
  name,
  idOrganization,
  closed,
  desc,
  memberships,
  lists,
});
