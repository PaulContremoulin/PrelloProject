// Modules
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Css...

// Actions & Constant


export class LoginToBeConnected extends React.Component {
  constructor(props) {
   super(props);
   this.nameUser;
   this.passwUser;
   this.state = {
     nameUser: "",
     passwordUser: "",
     error_Str: ""
   };
 }

 handleChange = (callback) => {

 }

 handleSubmit = event => {

 }

 login = ( state ) => ;

  render() {
    return (

    )
  }
}
const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = (dispatch) => ({
  setLogin: (res) => dispatch( setLogin(res)),
});

export const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)( LoginToBeConnected )
