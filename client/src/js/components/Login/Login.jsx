// Modules
import React from 'react';

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
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
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