// Modules
import React from 'react';
import {Login} from './Login/Login';
import {Registration} from './Registration/Registration';
import {NavBar} from './NavBar/NavBar';

// Css...

// Actions & Constant


export class Sign extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        "signUpMode" : false,
      }
  }

  toggleMode = () => {
    this.setState({
      signUpMode: !this.state.signUpMode
    })
  }

  changeMode = (mode) => {
    this.setState({
      signUpMode: mode
    })
  }

  render() {
    const { signUpMode } = this.state;
    return (
      <div className="Sign">
        <NavBar changeMode= { ( mode ) => this.changeMode( mode ) }/>
        {signUpMode ? <Registration onClick={ () => this.toggleMode() } /> : <Login onClick={ () => this.toggleMode() } />}
      </div>
    );
  }

}
