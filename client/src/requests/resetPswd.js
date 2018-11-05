import axios from "axios/index";

export const changePswd = (
    tokenUser,
    password,
    iduser,
) => (
    axios.post( process.env.REACT_APP_API_URL+'/api/members/'+iduser+'/password/reset?token='+tokenUser,
        {
            password : password,
        })
        .then(response => response)
);

export const checkToken = (
    tokenUser,
        iduser,
) => (
    axios.get( process.env.REACT_APP_API_URL+'/api/members/'+iduser+'/password/reset?token='+tokenUser)
        .then(response => response)
);

export const resetPswd = (
  email,
  callback
) => (
  axios.post( process.env.REACT_APP_API_URL+'/api/auth/forgot/password', {
    email,
      callback
  })
  .then( response => response )
);



