// Modules
import { combineReducers } from 'redux';
import { CARD_SET_NAME, CARD_SET_DESC, CARD_SET_CLOSED, CARD_SET_DUE, CARD_ADD_CHECKLIST } from '../../actions/cardActions';


const card = ( state = {}, action ) => {
  switch (action.type) {
  case CARD_SET_NAME :
    return (action.card.id === state._id ) ? { ...state, name: action.card.name } : state
  case CARD_SET_DUE :
    return (action.card.id === state._id ) ? { ...state, due: action.card.due } : state
  case CARD_SET_DESC :
    return (action.card.id === state._id ) ? { ...state, desc: action.card.desc } : state
  case CARD_SET_CLOSED :
    return (action.card.id === state._id ) ? { ...state, closed: action.card.closed } : state
  default:
    return state ;
  }
}
const card = ( state = {}, action ) => {
  switch (action.type) {
  case CARD_SET_NAME :
    return (action.card.id === state._id ) ? { ...state, name: action.card.name } : state
  case CARD_SET_DUE :
    return (action.card.id === state._id ) ? { ...state, due: action.card.due } : state
  case CARD_SET_DESC :
    return (action.card.id === state._id ) ? { ...state, desc: action.card.desc } : state
  case CARD_SET_CLOSED :
    return (action.card.id === state._id ) ? { ...state, closed: action.card.closed } : state
  default:
    return state ;
  }
}
const card = ( state = {}, action ) => {
  switch (action.type) {
  case CARD_SET_NAME :
    return (action.card.id === state._id ) ? { ...state, name: action.card.name } : state
  case CARD_SET_DUE :
    return (action.card.id === state._id ) ? { ...state, due: action.card.due } : state
  case CARD_SET_DESC :
    return (action.card.id === state._id ) ? { ...state, desc: action.card.desc } : state
  case CARD_SET_CLOSED :
    return (action.card.id === state._id ) ? { ...state, closed: action.card.closed } : state
  default:
    return state ;
  }
}


// combineReducers is a redux function which associate object key with a reducers
// It return a reducer responsible for this sub-state
// combineReducers got others untold subtilities
export const card = combineReducers({
  _id,
  name,
  due,
  desc,
  closed,
  checklists,
});
