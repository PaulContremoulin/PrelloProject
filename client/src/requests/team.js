import { postRequest } from './genericRequest';

/**
*
*/
export const addTeamToDB = (
  userId,
  teamName
) => (
  postRequest( '/api/team/', {
    userId,
    teamName
  })
  .then( response => response.data )
      /*
  .catch( error => {code: error.code, message: error.message} )
  */
)
