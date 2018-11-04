import { postRequest } from './genericRequest';
import axios from "axios/index";

export const changePswd = (
    tokenUser,
    newPswd,
) => (
    //todo : change request
    axios.post( process.env.REACT_APP_API_URL+'/api/',
        {
            newPswd,
        },
        {
            headers : { Authorization: 'Bearer '+ tokenUser},
        })
        .then(response => response.data)
);

export const resetPswd = (
  email
) => (
  postRequest( '/auth/login/forgot/password', {
    email
  })
  .then( response => console.log(response) || response.data )
);



