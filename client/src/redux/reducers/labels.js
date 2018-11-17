// Modules
import { combineReducers } from 'redux';
import { SET_LABELS, SET_NAME_LABEL, ADD_LABEL, SET_COLOR_LABEL, DELETE_LABEL } from '../../actions/labelActions';
import { SET_BOARD } from '../../actions/boardActions';

import { DEFAULT_LABEL } from '../../constants';

export const labels = ( state = [], action ) => {
  switch (action.type) {
    case SET_BOARD :
      return action.board.labels || [];
    case SET_LABELS :
      return [...(action.labels.map(
        labelObj => label(labelObj, action)
      )) ]
    case ADD_LABEL :
      return [ ...state, {...action.label} ]
    case SET_NAME_LABEL :
    case SET_COLOR_LABEL :
      return state.map(
        label => (label.id == action.label.id) ? label(label, action) : state
      )
    case DELETE_LABEL:
      return state.filter( label => label.id != action.label.id )
    default:
      return state ;
  }
}

const id = ( state = DEFAULT_LABEL.id, action ) => {
  switch (action.type) {
    case SET_LABELS :
      return action.label.id;
    default:
      return state ;
  }
}
const name = ( state = DEFAULT_LABEL.name, action ) => {
  switch (action.type) {
    case SET_LABELS :
    case SET_NAME_LABEL :
      return action.label.name;
  default:
    return state ;
  }
}
const color = ( state = DEFAULT_LABEL.color, action ) => {
  switch (action.type) {
    case SET_LABELS :
    case SET_COLOR_LABEL :
      return action.label.color;
  default:
    return state ;
  }
}
const idBoard = ( state = DEFAULT_LABEL.idBoard, action ) => {
  switch (action.type) {
    case SET_LABELS :
      return action.label.idBoard;
  default:
    return state ;
  }
}
// combineReducers is a redux function which associate object key with a reducers
// It return a reducer responsible for this sub-state
// combineReducers got others untold subtilities
export const label = combineReducers({
  id,
  name,
  color,
  idBoard,
});
