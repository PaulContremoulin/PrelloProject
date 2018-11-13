// Modules
import { combineReducers } from 'redux';
import { CARD_SET_NAME, CARD_SET_DESC, CARD_SET_CLOSED, CARD_SET_DUE, CARD_ADD_CHECKLIST } from '../../actions/cardActions';

import { DEFAULT_CARD } from '../../constants';


const id = ( state = DEFAULT_CARD.id, action ) => {
  switch (action.type) {
  default:
    return state ;
  }
}
const name = ( state = DEFAULT_CARD.name, action ) => {
  switch (action.type) {
  case CARD_SET_NAME :
    return (action.card.id === state.id ) ? { ...state, name: action.card.name } : state
  default:
    return state ;
  }
}
const desc = ( state = DEFAULT_CARD.desc, action ) => {
  switch (action.type) {
  case CARD_SET_DESC :
    return (action.card.id === state.id ) ? { ...state, desc: action.card.desc } : state
  default:
    return state ;
  }
}
const due = ( state = DEFAULT_CARD.due, action ) => {
  switch (action.type) {
  case CARD_SET_DUE :
    return (action.card.id === state.id ) ? { ...state, due: action.card.due } : state
  default:
    return state ;
  }
}
const dueComplete = ( state = DEFAULT_CARD.dueComplete, action ) => {
  switch (action.type) {
  default:
    return state ;
  }
}
const closed = ( state = DEFAULT_CARD.closed, action ) => {
  switch (action.type) {
  case CARD_SET_CLOSED :
    return (action.card.id === state.id ) ? { ...state, closed: action.card.closed } : state
  default:
    return state ;
  }
}
const pos = ( state = DEFAULT_CARD.pos, action ) => {
  switch (action.type) {
      default:
          return state ;
  }
}
const idMembers = ( state = DEFAULT_CARD.idMembers, action ) => {
  switch (action.type) {
      default:
          return state ;
  }
}
const idLabels = ( state = DEFAULT_CARD.idLabels, action ) => {
  switch (action.type) {
      default:
          return state ;
  }
}


// combineReducers is a redux function which associate object key with a reducers
// It return a reducer responsible for this sub-state
// combineReducers got others untold subtilities
export const card = combineReducers({
  id,
  name,
  desc,
  due,
  dueComplete,
  closed,
  pos,
  idMembers,
  idLabels,
});
