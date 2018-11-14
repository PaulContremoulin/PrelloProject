export const SET_STATE = 'SET_STATE';

export const changeState = (state) => {
    return {
        type: SET_STATE,
        state,
    }
};