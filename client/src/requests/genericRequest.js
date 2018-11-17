import axios from 'axios';
import { store } from "../redux/store";

/**
 * @desc creates a GET request to the API
 * @param { String } url
 * @param { Object } config
 * @return status code
 */
export function getRequest( url, config = {} ) {
  config["headers"] = getUserToken();
  return axios.get( process.env.REACT_APP_API_URL + (url), config )
}

/**
 * @desc creates a POST request to the API
 * @param { String } url
 * @param { Object } body
 * @param { Object } config
 * @return status code
 */
export function postRequest( url, body = {}, config = {} ) {
  config["headers"] = getUserToken();
  return axios.post( process.env.REACT_APP_API_URL + (url), body, config )
}

/**
 * @desc creates a DELETE request to the API
 * @param { String } url
 * @param { Object } config
 * @return status code
 */
export function deleteRequest( url, config = {} ) {
  config["headers"] = getUserToken();
  return axios.delete( process.env.REACT_APP_API_URL + (url), config )
}

/**
 * @desc creates a PUT request to the API
 * @param { String } url
 * @param { Object } body
 * @param { Object } config
 * @return status code
 */
export function putRequest( url, body = {}, config = {} ) {
  config["headers"] = getUserToken();
  return axios.put( process.env.REACT_APP_API_URL + (url), body, config )
}

/**
 * @desc fetch the token to identify the user
 * @return Object
 */
function getUserToken() {
  const stateStore = store.getState();
  if (stateStore.user.token) {
    return { Authorization: 'Bearer '+ stateStore.user.token }
  } else {
    return {}
  }
}
