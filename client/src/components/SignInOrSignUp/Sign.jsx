// Modules
import React from 'react';
import {Login} from '../Login/Login';
import {Registration} from '../Registration/Registration';

// Css...

// Actions & Constant


export class Sign extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        "signUpMode" : false,
      }
  }

  changeMode = () => {
    this.setState({
      signUpMode: !this.state.signUpMode
    })
  }

  render() {
    const { signUpMode } = this.state;
    return (
      <div className="Sign">
        {signUpMode ? <Registration onClick={ () => this.changeMode() } /> : <Login onClick={ () => this.changeMode() } />}
      </div>
    );
  }

}
