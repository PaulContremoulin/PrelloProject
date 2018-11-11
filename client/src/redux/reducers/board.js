// Modules
import { combineReducers } from 'redux';

// Actions & constants
/**
 * Action types are exported from the action source file
 * It's the best place to avoid circular dependencies
 */
// import { list } from './list';

import { DEFAULT_BOARD } from '../../constants';


import { SET_BOARD, ADD_LIST, MOVE_LIST, ADD_CARD, MOVE_CARD, MOVE_CARD_FROM_LIST, SET_BOARD_MEMBERS, ADD_MEMBER, EDIT_ROLE_MEMBER } from '../../actions/boardActions';

import { CARD_SET_NAME, CARD_SET_DESC, CARD_SET_CLOSED, CARD_SET_DUE, CARD_ADD_CHECKLIST, CARD_ADD_CHECKITEM, CARD_SET_CHECKLISTS } from '../../actions/cardActions';

import { LIST_SET_NAME } from '../../actions/listActions';


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

// organization reducer
const idOrganization = ( state = DEFAULT_BOARD.idOrganization, action ) => {
    switch ( action.type ) {
        case SET_BOARD :
            return action.board.idOrganization ;
        default:
            return state ;
    }
};

// prefs reducer
const prefs = ( state = DEFAULT_BOARD.prefs, action ) => {
  switch ( action.type ) {
    case SET_BOARD :
      return action.board.prefs;
    default:
      return state ;
  }
};

/// description reducer
const desc = ( state = DEFAULT_BOARD.desc, action ) => {
    switch ( action.type ) {
        case SET_BOARD :
            return action.board.desc ;
        default:
            return state ;
    }
};

// board closed reducer
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
            return action.board.memberships;
        case SET_BOARD_MEMBERS :
            return action.listMembers;
        case ADD_MEMBER :
            return [...state,action.member];
        case EDIT_ROLE_MEMBER:
            return state.map(member => member._id === action.member._id ? {...member, memberType:action.member.memberType} : member);
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
    case LIST_SET_NAME :
      return state.map(
        list => (list.id === action.list.id) ? {...list, name: action.list.name} : list
      )
    case ADD_CARD :
    console.log('im called');
    console.log(action);
      return state.map(
        list => (list.id === action.card.idList) ? { ...list, cards: [...list.cards, { ...action.card, id: action.card._id }] } : list
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
    case CARD_SET_CHECKLISTS :
    case CARD_ADD_CHECKLIST :
    case CARD_ADD_CHECKITEM :
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
  console.log(action);
  console.log(state);
  switch (action.type) {
    case CARD_SET_NAME :
      return (action.card.id == state.id ) ? { ...state, name: action.card.name } : state
    case CARD_SET_DUE :
      return (action.card.id == state.id ) ? { ...state, due: action.card.due } : state
    case CARD_SET_DESC :
      return (action.card.id == state.id ) ? { ...state, desc: action.card.desc } : state
    case CARD_SET_CLOSED :
      return (action.card.id == state.id ) ? { ...state, closed: action.card.closed } : state
    case CARD_SET_CHECKLISTS :
    case CARD_ADD_CHECKLIST :
    case CARD_ADD_CHECKITEM :
      return (action.card.id == state.id ) ? { ...state, checklists: checklists( state.checklists, action ) } : state
    default:
      return state ;
  }
}


const checklists = ( state = [], action ) => {
  switch (action.type) {
    case CARD_SET_CHECKLISTS :
      return action.card.checklists;
    case CARD_ADD_CHECKLIST :
      return [ ...state, {...action.card.checklist, checkItems: [] } ]
    case CARD_ADD_CHECKITEM :
      return state.map(
        (checkList, index) => (action.card.checklist.id == checkList.id ) ? [ ...state, { ...checkList, checkItems: checkItems( checkList.checkItems, action )}] : checkList
      )
    default:
      return state ;
  }
}

const checkItems = ( state = [], action ) => {
  switch (action.type) {
    case CARD_ADD_CHECKITEM :
      return [ ...state, {...action.card.checklists.checkItem} ]
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
