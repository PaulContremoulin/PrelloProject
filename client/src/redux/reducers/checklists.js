// Modules

import { combineReducers } from 'redux';

// Actions & constants
/**
 * Action types are exported from the action source file
 * It's the best place to avoid circular dependencies
 */

import { CARD_ADD_CHECKLIST, CARD_ADD_CHECKITEM, CARD_SET_CHECKLISTS } from '../../actions/cardActions';
import { RESET_CHECKLISTS, CHECKLIST_SET_NAME, CHECKLIST_SET_POS, CHECKITEM_SET_NAME, CHECKITEM_SET_POS, CHECKITEM_SET_STATE } from '../../actions/checkObjectActions';

export const checklists = ( state = [], action ) => {
  switch (action.type) {
    case RESET_CHECKLISTS :
      return [];
    case CARD_SET_CHECKLISTS :
      return [...action.card.checklists];
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
