import {DELETE_BOARD_CIRCLE, FETCH_CIRCLE} from "../../actions/circleActions";

export const circle = ( state = [], action ) => {
    switch( action.type ){
        case DELETE_BOARD_CIRCLE :
            const boardId = action.boardId;
            return { circle: state.circle.filter(circle => circle.idBoards._id !== boardId)};
        case FETCH_CIRCLE :
            return action.circle;
        default:
            return state;
    }
};