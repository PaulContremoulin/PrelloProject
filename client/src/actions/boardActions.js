// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
export const ADD_BOARD= "ADD_BOARD" ;
export const FETCH_BOARD = 'FETCH_BOARD';

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */

/**
 * @desc add board
 * @param board
 * @return ADD_BOARD action
 */
export const addBoard =  (board) => {
    return {
        type: ADD_BOARD,
        payload: {
            _id: board._id,
            name: board.name,
            color: board.color
        }
    }
};

/**
 * @desc set all boards
 * @param boards
 * @return FETCH_BOARD action
 */
export const fetchBoards = (boards) => {
    return {
        type: FETCH_BOARD,
        boards
    }
};

