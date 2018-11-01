import axios from 'axios';

/**
*
*/
export const addCircleToDB = (
  userId,
  circleName
) => (
  axios.post( process.env.API_URL+'/api/circle/', {
    userId,
    circleName
  })
  .then( response => response.data )
  .catch( error => {code: error.code, message: error.message} )
)
