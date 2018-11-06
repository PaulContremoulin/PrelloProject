
// Actions & constants
/**
 * Action types are exported from the action source file
 * It's the best place to avoid circular dependencies
 */
import { ADD_BOARD, FETCH_BOARD } from "../../actions/boardActions";

/******************************************************************************/
/******************************* BOARDS REDUCERS ********************************/
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

export const boards = (state = [], action) => {
    switch (action.type) {
        case ADD_BOARD:
            return [...state, action.board];
        case FETCH_BOARD:
            return action.boards;
        default:
            return state;
    }
};
