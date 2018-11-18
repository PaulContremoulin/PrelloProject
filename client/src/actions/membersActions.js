// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
export const ADD_MEMBER_CREATION= "ADD_MEMBER";
export const DELETE_MEMBER_CREATION = "DELETE_MEMBER";
export const FETCH_MEMBERS_CREATION = "FETCH_MEMBERS_CREATION";

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */

/**
 * @desc add member when create a board
 * @param member
 * @return ADD_MEMBER_CREATION action
 */
export const addMemberCreationBoard =  (member) => {
    return {
        type: ADD_MEMBER_CREATION,
        member
    }
}

/**
 * @desc delete member when create a board
 * @param member
 * @return DELETE_MEMBER_CREATION action
 */
export const deleteMemberCreationBoard = (member) => {
    return {
        type: DELETE_MEMBER_CREATION,
        member
    }
}

/**
 * @desc fetch members when create a board
 * @param members
 * @return FETCH_MEMBERS_CREATION action
 */
export const fetchMembersCreationBoard = () => {
    return {
        type: FETCH_MEMBERS_CREATION,
        members: []
    }
}




