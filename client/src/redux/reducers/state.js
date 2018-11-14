import {SET_STATE} from "../../actions/stateBoards";

export const state = ( state = {}, action ) => {
    switch( action.type ){
        case SET_STATE :
            return action.state ;
        default:
            return state ;
    }
};