import { getRequest } from './genericRequest';

/**
 * @desc github authentication
 * @param { String } code
 * @return status code
 */
export const githubAuth = (
    code
) => (
    getRequest('/api/auth/github/callback?code=' + code )
        .then( response => response )
        .catch(err => err.response)
);