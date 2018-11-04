import { postRequest } from './genericRequest';
import axios from "axios/index";

export const changePswd = (
    tokenUser,
    newPswd,
    iduser,
) => (
    axios.post( process.env.REACT_APP_API_URL+'/api/members/'+iduser+'/password/reset?token='+tokenUser,
        {
            newPswd
        })
        .then(response => response.data)
);

export const checkToken = (
    tokenUser,
        iduser,
) => (
    axios.get( process.env.REACT_APP_API_URL+'/api/members/'+iduser+'/password/reset?token='+tokenUser)
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



