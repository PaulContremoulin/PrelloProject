import axios from 'axios';

/**
*
*/
export const addTeamToDB = (
  userId,
  teamName
) => (
  axios.post( process.env.API_URL+'/api/team/', {
    userId,
    teamName
  })
  .then( response => response.data )
  .catch( error => {code: error.code, message: error.message} )
)
