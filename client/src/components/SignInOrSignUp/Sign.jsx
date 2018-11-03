// Modules
import React from 'react';
import {Login} from './Login/Login';
import {Registration} from './Registration/Registration';
import {ResetPswd} from './ResetPswd/ResetPswd';
import {NavBar} from '../NavBar/NavBar';

// Css...

// Actions & Constant


export class Sign extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        "signUpMode" : false,
        "requestResetPswd" : false,
      }
  }

  toggleMode = () => {
    this.setState({
      signUpMode: !this.state.signUpMode
    })
  }

  toggleResetPswd = () => {
    this.setState({
      requestResetPswd: !this.state.requestResetPswd
    })
  }

  changeMode = (mode) => {
    this.setState({
      signUpMode: mode
    })
  }

  render() {
    const { signUpMode, requestResetPswd } = this.state;
    return (
      <div className="Sign">
        <NavBar changeMode= { ( mode ) => this.changeMode( mode ) } />
          { (requestResetPswd) ?
            <ResetPswd toggleResetPswd={ () => this.toggleResetPswd() }/>
            :
            (signUpMode) ?
            <Registration onClick={ () => this.toggleMode() } />
            :
            <Login onClick={ () => this.toggleMode() } toggleResetPswd={ () => this.toggleResetPswd() } />
          }
      </div>
    );
  }

}
