import axios from 'axios';
import { store } from "../redux/store";

console.log(store.getState().user);

export function getRequest( url, config = {} ) {
  config["headers"] = getUserToken();
  return axios.get( process.env.REACT_APP_API_URL + url, config )
}

export function postRequest( url, body = {}, config = {} ) {
  config["headers"] = getUserToken();
  return axios.post( process.env.REACT_APP_API_URL + url, body, config )
}

export function deleteRequest( url, config = {} ) {
  config["headers"] = getUserToken();
  return axios.delete( process.env.REACT_APP_API_URL + url, config )
}

export function putRequest( url, body = {}, config = {} ) {
  config["headers"] = getUserToken();
  return axios.put( process.env.REACT_APP_API_URL + url, body, config )
}

function getUserToken() {
  const stateStore = store.getState();
  if (stateStore.user.token) {
    return { Authorization: 'Bearer '+ stateStore.user.token }
  } else {
    return {}
  }
}
