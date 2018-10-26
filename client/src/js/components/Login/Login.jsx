// Modules
import React from 'react';
import './Login.css';
import Ionicon from 'react-ionicons'

// Css...

// Actions & Constant


export class Login extends React.Component {
    /*
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
   */
    render() {
        return (
            <div className="Login container">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h3>Sign In</h3>
                    </div>
                </div>
                <div className="loginForm container">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3">
                            <form>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-2 col-md-1">
                                            <Ionicon icon="md-contact"/>
                                        </div>
                                        <div className="col-10 col-md-11">
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email address"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-2 col-md-1">
                                            <Ionicon icon="md-unlock"/>
                                        </div>
                                        <div className="col-10 col-md-11">
                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter password"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Sign In</button>
                                </div>
                                <div className="buttonGithub text-center">
                                    <button type="submit" className="btn"><Ionicon icon="logo-github"/> Sign In with Github</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
/*
const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = (dispatch) => ({
  setLogin: (res) => dispatch( setLogin(res)),
});

export const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)( LoginToBeConnected )
*/