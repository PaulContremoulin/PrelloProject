// Modules
import { combineReducers } from 'redux';

// Actions & constants
/**
 * Action types are exported from the action source file
 * It's the best place to avoid circular dependencies
 */
// import { list } from './list';

import { DEFAULT_BOARD } from '../../constants';

import { EDIT_STATE_BOARD, SET_BOARD, ADD_LIST, MOVE_LIST, ADD_CARD, MOVE_CARD, MOVE_CARD_FROM_LIST, SET_BOARD_MEMBERS, ADD_MEMBER, EDIT_ROLE_MEMBER, EDIT_INFORMATION_BOARD, DELETE_CARD } from '../../actions/boardActions';

import { CARD_SET_NAME, CARD_SET_DESC, CARD_SET_CLOSED, CARD_SET_DUE, CARD_SET_DUE_COMPLETE, CARD_ADD_MEMBER, CARD_DELETE_MEMBER } from '../../actions/cardActions';

import { LIST_SET_NAME, LIST_SET_CLOSED, LIST_DELETE } from '../../actions/listActions';

import { sortObjects } from '../../boardUtil';
import { card } from './card';


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
        case EDIT_INFORMATION_BOARD:
            return action.board.name;
        default:
            return state ;
    }
}

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
        case EDIT_INFORMATION_BOARD:
            return action.board.desc;
        default:
            return state ;
    }
};

// board closed reducer
const closed = ( state = DEFAULT_BOARD.closed, action ) => {
    switch ( action.type ) {
        case SET_BOARD :
            return action.board.closed ;
        case EDIT_STATE_BOARD:
            return action.state;
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
          if ( action.board.lists ) {
            const sortedCards = action.board.lists.map(
              list => ( { ...list, cards: list.cards.sort( sortObjects )} )
            )
            const sortedArrayList = sortedCards.sort( sortObjects );
            return sortedArrayList;
          } else {
            return []
          }
        case ADD_LIST :
          return [
              ...state,
              {
                ...action.list
              }
          ];
        case LIST_DELETE :
          return state.filter(
            list => !(list.id === action.list.id)
          );
        case LIST_SET_NAME :
            return state.map(
                list => (list.id === action.list.id) ? {...list, name: action.list.name} : list
            )
        case LIST_SET_CLOSED :
          return state.map(
            list => (list.id === action.list.id) ? {...list, closed: action.list.closed} : list
          )
        case ADD_CARD :
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
        case CARD_SET_DUE_COMPLETE :
        case CARD_SET_DESC :
        case CARD_SET_CLOSED :
        case CARD_ADD_MEMBER :
        case CARD_DELETE_MEMBER :
            return state.map(
              (list, index) => !(list.id == action.list.id) ? list :
                {
                    ...list,
                    cards: list.cards.map(
                        (cardObj, index) => (action.card.id === cardObj.id ) ? card( cardObj, action ) : cardObj
                    )
                });
        case DELETE_CARD :
            return state.map(
                (list, index) => !(list.id == action.list.id) ? list :
                    {
                        ...list,
                        cards: list.cards.filter((cardObj, index) => (action.card.id !== cardObj.id ))
                    });
        default:
            return state ;
    }
};

// combineReducers is a redux function which associate object key with a reducers
// It return a reducer responsible for this sub-state
// combineReducers got others untold subtilities
export const board = combineReducers({
    _id,
    name,
    closed,
    desc,
    memberships,
    lists,
});
