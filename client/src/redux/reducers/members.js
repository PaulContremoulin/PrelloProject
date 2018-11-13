import {ADD_MEMBER_CREATION, DELETE_MEMBER_CREATION, FETCH_MEMBERS_CREATION} from "../../actions/membersActions";


export const members = ( state = [], action ) => {
    switch( action.type ){
        case ADD_MEMBER_CREATION :
            return [...state, action.member];
        case DELETE_MEMBER_CREATION :
            return state.filter(memberL => memberL._id !== action.member._id);
        case FETCH_MEMBERS_CREATION:
            return action.members;
        default:
            return state ;
    }
};