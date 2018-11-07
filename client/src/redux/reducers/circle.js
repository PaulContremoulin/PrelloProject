import {FETCH_CIRCLE} from "../../actions/circleActions";

export const circle = ( state = [], action ) => {
    switch( action.type ){
        case FETCH_CIRCLE :
            return action.circle;
        default:
            return state;
    }
};