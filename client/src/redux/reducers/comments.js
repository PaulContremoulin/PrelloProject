// Modules

import { combineReducers } from 'redux';

// Actions & constants
/**
 * Action types are exported from the action source file
 * It's the best place to avoid circular dependencies
 */

import {RESET_COMMENTS, SET_COMMENTS, ADD_COMMENT, SET_TEXT_COMMENT } from '../../actions/commentActions';

export const comments = ( state = [], action ) => {
  switch (action.type) {
    case RESET_COMMENTS :
      return [];
    case SET_COMMENTS :
      return [...(action.comments.map(
        commentObj => comment(commentObj, action)
      )) ]
    case ADD_COMMENT :
      return [ ...state, {...action.comment} ]
    case SET_TEXT_COMMENT :
      return state.map(
        comment => (comment.id == action.comment.id) ? comment(comment, action) : state
      )
    default:
      return state ;
  }
}

const id = ( state = "", action ) => {
  switch (action.type) {
    case SET_COMMENTS :
      return action.comment.id;
    default:
      return state ;
  }
}

const text = ( state = "", action ) => {
  switch (action.type) {
    case SET_COMMENTS :
    case SET_TEXT_COMMENT :
      return action.comment.text;
    default:
      return state ;
  }
}

const idAuthor = ( state = {}, action ) => {
  switch (action.type) {
    case SET_COMMENTS :
      return action.comment.idAuthor;
    default:
      return state ;
  }
}

const idCard = ( state = "", action ) => {
  switch (action.type) {
    case SET_COMMENTS :
      return action.comment.idCard;
    default:
      return state ;
  }
}

const date = ( state = Date.now(), action ) => {
  switch (action.type) {
    case SET_COMMENTS :
      return action.comment.date;
    default:
      return state ;
  }
}

// combineReducers is a redux function which associate object key with a reducers
// It return a reducer responsible for this sub-state
// combineReducers got others untold subtilities
const comment = combineReducers({
    id,
    text,
    idAuthor,
    idCard,
    date,
});
