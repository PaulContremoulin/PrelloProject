// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
export const FETCH_CIRCLES = 'FETCH_CIRCLES';
export const ADD_CIRCLE = 'ADD_CIRCLE';
export const FETCH_CIRCLE = 'FETCH_CIRCLE';
export const DELETE_BOARD_CIRCLE = 'DELETE_BOARD_CIRCLE';
export const DELETE_CIRCLE = 'DELETE_CIRCLE';
export const EDIT_CIRCLE = 'EDIT_CIRCLE';

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */

/**
 * @desc fetch all circles of the user
 * @return FETCH_CIRCLES action
 */
export const fetchCircles = (circles) => {
    return {
        type: FETCH_CIRCLES,
        circles
    }
};

/**
 * @desc add a circle
 * @return ADD_CIRCLE action
 */
export const addCircle = (data) => {
    return {
        type: ADD_CIRCLE,
        circle: data,
    }
};

/**
 * @desc set a circle
 * @return FETCH_CIRCLE action
 */
export const setCircle = (circle) => {
    return {
        type: FETCH_CIRCLE,
        circle
    }
};

/**
 * @desc delete boards from a circle
 * @return DELETE_BOARD_CIRCLE action
 */
export const deleteBoardsCircle = (boardId) => {
    return {
        type: DELETE_BOARD_CIRCLE,
        boardId: boardId,
    }
};

/**
 * @desc delete a circle
 * @return DELETE_CIRCLE action
 */
export const deleteCircle = (circleId) => {
    return {
        type: DELETE_CIRCLE,
        circleId: circleId,
    }
};

/**
 * @desc edit a circle
 * @return EDIT_CIRCLE action
 */
export const editCircle = (circle) => {
    return {
        type: EDIT_CIRCLE,
        circle
    }
}