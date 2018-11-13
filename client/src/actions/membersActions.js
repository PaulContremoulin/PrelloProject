export const ADD_MEMBER_CREATION= "ADD_MEMBER";
export const DELETE_MEMBER_CREATION = "DELETE_MEMBER";
export const FETCH_MEMBERS_CREATION = "FETCH_MEMBERS_CREATION";

export const addMemberCreationBoard =  (member) => {
    return {
        type: ADD_MEMBER_CREATION,
        member
    }
}

export const deleteMemberCreationBoard = (member) => {
    return {
        type: DELETE_MEMBER_CREATION,
        member
    }
}

export const fetchMembersCreationBoard = (members) => {
    return {
        type: FETCH_MEMBERS_CREATION,
        members
    }
}




