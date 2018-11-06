// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
export const FETCH_CIRCLES = 'FETCH_CIRCLES';
export const ADD_CIRCLE = 'ADD_CIRCLE';

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
export const fetch_circles = () => {
    return {
        type: FETCH_CIRCLES
    }
};

/**
 * @desc add a circle
 * @return ADD_CIRCLE action
 */
export const addCircle = (circleId, circleName) => {
    return {
        type: ADD_CIRCLE,
        circle: {
          circleId: circleId,
          circleName: circleName
        }
    }
};
