// Modules

import { combineReducers } from 'redux';

// Actions & constants
/**
 * Action types are exported from the action source file
 * It's the best place to avoid circular dependencies
 */

import { CARD_ADD_CHECKLIST, CARD_ADD_CHECKITEM, CARD_SET_CHECKLISTS } from '../../actions/cardActions';
import {
    RESET_CHECKLISTS,
    CHECKLIST_SET_NAME,
    DELETE_CHECKLIST,
    ADD_CHECKITEM,
    CHECKLIST_SET_POS,
    CHECKITEM_SET_NAME,
    CHECKITEM_SET_POS,
    CHECKITEM_SET_STATE,
} from '../../actions/checkObjectActions';

export const checklists = ( state = [], action ) => {
  switch (action.type) {
    case RESET_CHECKLISTS :
      return [];
    case CARD_SET_CHECKLISTS :
      return [...action.card.checklists];
    case CARD_ADD_CHECKLIST :
      return [ ...state, {...action.card.checklist, checkItems: [] } ];
    case ADD_CHECKITEM :
      return state.map( (checklist, index) => (action.card.checklist.id == checklist.id) ? { ...checklist, checkItems : checkItems(checklist.checkItems, action)} : checklist);
    case CHECKITEM_SET_STATE :
      return state.map( (checklist, index) => (action.card.checklist.id == checklist.id) ? { ...checklist, checkItems : checkItems(checklist.checkItems, action)} : checklist);
    case CHECKLIST_SET_NAME :
      return state.map((checklist, index) => (action.card.checklist.id == checklist.id ) ? { ...checklist, name: action.card.checklist.name } : checklist);
    case DELETE_CHECKLIST:
      return state.filter(checklist => checklist.id !== action.card.checklist.id)
    default:
      return state ;
  }
};

const checkItems = ( state = [], action ) => {
  switch (action.type) {
    case ADD_CHECKITEM :
      return [ ...state, action.card.checklist.checkItem ];
    case CHECKITEM_SET_STATE :
      return state.map((checkItem, index) => (action.card.checklist.checkItem.id == checkItem.id ) ? { ...checkItem, state: action.card.checklist.checkItem.state } : checkItem);
    default:
      return state ;
  }
}

// From card
// case CARD_SET_CHECKLISTS :
// case CARD_ADD_CHECKLIST :
// case CARD_ADD_CHECKITEM :
// return (action.card.id == state.id ) ? { ...state, checklists: checklists( state.checklists, action ) } : state
