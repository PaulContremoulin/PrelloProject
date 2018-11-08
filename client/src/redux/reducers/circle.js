import {DELETE_BOARD_CIRCLE, FETCH_CIRCLE} from "../../actions/circleActions";

export const circle = ( state = [], action ) => {
    switch( action.type ){
        case DELETE_BOARD_CIRCLE :
            const boardId = action.boardId;
            const newidBoards = state.idBoards.filter(board => board._id !== boardId);
            return {...state,idBoards:newidBoards};
        case FETCH_CIRCLE :
            return action.circle;
        default:
            return state;
    }
};