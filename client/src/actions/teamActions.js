// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
export const FETCH_TEAMS = 'FETCH_TEAMS';
export const ADD_TEAM = 'ADD_TEAM';

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */

/**
 * @desc fetch all teams of the user
 * @return FETCH_TEAMS action
 */
export const fetchTeams = () => {
    return {
        type: FETCH_TEAMS
    }
};


/**
 * @desc add a team
 * @return ADD_TEAM action
 */
export const addTeam = (teamId, teamName) => {
    return {
        type: ADD_TEAM,
        team: {
          teamId: teamId,
          teamName: teamName
        }
    }
};
