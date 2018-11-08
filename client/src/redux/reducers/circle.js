import {SET_CIRCLE} from "../../actions/circleActions";

export const circle = ( state = [], action ) => {
    switch( action.type ){
        case SET_CIRCLE :
            return action.circle;
        default:
            return state ;
    }
};