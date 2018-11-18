// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
export const SET_STATE = 'SET_STATE';

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */

/**
 * @desc change state board
 * @param state
 * @return ADD_BOARD action
 */
export const changeState = (state) => {
    return {
        type: SET_STATE,
        state,
    }
};