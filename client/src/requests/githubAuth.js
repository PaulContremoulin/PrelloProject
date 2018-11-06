import axios from 'axios';

/**
*/
export const githubAuth = (
  code
) => (
  axios.get( process.env.REACT_APP_API_URL+'/api/auth/github/callback?code=' + code )
)
