import { postRequest } from './genericRequest';

/**
*
*/
export const addCircleToDB = (
  userId,
  circleName
) => (
  postRequest( '/api/circle/', {
    userId,
    circleName
  })
  .then( response => response.data )
      /*
  .catch( error => {code: error.code, message: error.message} )
  */
)
