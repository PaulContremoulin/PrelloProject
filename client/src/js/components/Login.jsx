// Modules
import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

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
                <h2>Test</h2>
                <ButtonToolbar>
                    {/* Standard button */}
                    <Button>Default</Button>

                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="primary">Primary</Button>

                    {/* Indicates a successful or positive action */}
                    <Button bsStyle="success">Success</Button>

                    {/* Contextual button for informational alert messages */}
                    <Button bsStyle="info">Info</Button>

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning">Warning</Button>

                    {/* Indicates a dangerous or potentially negative action */}
                    <Button bsStyle="danger">Danger</Button>

                    {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
                    <Button bsStyle="link">Link</Button>
                </ButtonToolbar>
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