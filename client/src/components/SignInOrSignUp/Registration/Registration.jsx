// Modules
import React from 'react';
import './Registration.css';
import { registerUser } from '../../../requests/registration';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Octicon from 'react-octicon'
import {history} from '../../../history';
// Css...

// Actions & Constant


export class Registration extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        "username" : "",
        "firstName" : "",
        "lastName" : "",
        "email" : "",
        "passwordA" : "",
        "passwordB" : "",
        "organisation" : "",
        "allFieldsFilled" : true,
        "passwordsMatch" : true,
        "passwordIsValid" : true,
        "emailIsValid" : true
      }
  }

  setStateElement = (element, value) => {
    this.setState({
      [ element ]: value
    })
  }

   handleSubmit = event => {
       event.preventDefault();
       if ( this.state.username === "" || this.state.firstName === "" || this.state.lastName === "" || this.state.email === "" || this.state.passwordA === "" || this.state.passwordB === "") {
           this.setState({ allFieldsFilled: false });
       } else if ( this.state.passwordA !== this.state.passwordB ) {
           this.setState({ allFieldsFilled: true, passwordsMatch: false });
       } else if ( !this.state.emailIsValid ) {
           this.setState({ allFieldsFilled: true, passwordsMatch: true });
       } else if ( !this.state.passwordIsValid ) {
           this.setState({ allFieldsFilled: true, passwordsMatch: true, emailIsValid: true });
       } else {
           this.setState({ allFieldsFilled: true, passwordsMatch: true, emailIsValid: true, passwordIsValid: true });
           const username = this.state.username,
               firstName = this.state.firstName,
               lastName = this.state.lastName,
               email = this.state.email,
               passwordA = this.state.passwordA,
               organisation = this.state.organisation;
           registerUser(username, firstName, lastName, email, passwordA, organisation, process.env.REACT_APP_FRONT_URL);
           history.push('/');
       }
   }

   handleOnBlur = ( event, element ) => {
     this.setStateElement( element, event.target.value );
   }

   validateEmail = (e) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(e.target.value)) {
        this.setState({ emailIsValid: true, email: e.target.value })
    } else {
      this.setState({ emailIsValid: false, email: e.target.value })
    }
  }

  validatePassword = (e) => {
    const pswdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/g;
    if (pswdRegex.test(e.target.value)) {
      this.setState({ passwordIsValid: true, passwordA: e.target.value })
    } else {
      this.setState({ passwordIsValid: false, passwordA: e.target.value })
    }
  }

  onDismiss = (element) => {
      this.setState({
          [element]: true
      });
  };

  redirectionLogin = () => {
      history.push('/')
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col className="Registration" md={{ size: 6, offset: 3 }}>
              <h2 align="center">Sign Up</h2>
              <Alert color="danger" isOpen={!this.state.allFieldsFilled} toggle={() =>this.onDismiss("allFieldsFilled") }>
                  You need to fill all fields.
              </Alert>
              <Alert color="danger" isOpen={!this.state.passwordsMatch} toggle={() =>this.onDismiss("passwordsMatch") }>
                  The passwords do not match.
              </Alert>
              <Alert color="danger" isOpen={!this.state.passwordIsValid} toggle={() =>this.onDismiss("passwordIsValid") }>
                The password must contain at least 1 letter and 1 digit.
                The password must be at least 8 characters long.
              </Alert>
              <Alert color="danger" isOpen={!this.state.emailIsValid} toggle={() =>this.onDismiss("emailIsValid") }>
                  The email is not valid.
              </Alert>
              <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
                      <Col>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                                <Label>First name</Label>
                                <Input
                                    type="text"
                                    name="firstname"
                                    placeholder="First name"
                                    required={true}
                                    onBlur={( event ) => this.handleOnBlur( event, "firstName" )}
                                />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                                <Label>Last name</Label>
                                <Input
                                    type="text"
                                    name="lastname"
                                    placeholder="Last name"
                                    required={true}
                                    onBlur={( event ) => this.handleOnBlur( event, "lastName" )}
                                />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="text"
                                name="username"
                                placeholder="Username"
                                required={true}
                                onBlur={( event ) => this.handleOnBlur( event, "username" )}
                            />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required={true}
                                onBlur={( event ) => this.validateEmail( event )}
                            />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                            <Label for="firstPassword">Password</Label>
                            <Input
                                type="password"
                                name="passwordA"
                                placeholder="Password"
                                required={true}
                                onBlur={( event ) => this.validatePassword( event )}
                            />
                        </FormGroup>
                      </Col>
                      <Col>
                          <FormGroup>
                              <Label for="secondPassword">Confirm Password</Label>
                              <Input
                                  type="password"
                                  name="passwordB"
                                  placeholder="Confirm Password"
                                  required={true}
                                  onBlur={ ( event ) => this.handleOnBlur( event, "passwordB" ) }
                              />
                          </FormGroup>
                      </Col>
                        <Col>
                            <FormGroup>
                                <Label>Organisation</Label>
                                <Input
                                    type="text"
                                    name="organisation"
                                    placeholder="Enter your organisation"
                                    onBlur={( event ) => this.handleOnBlur( event, "organisation" )}
                                />
                            </FormGroup>
                        </Col>
                    <Col className="text-center">
                      <Button className="btnSign" type="submit">Sign Up</Button>
                    </Col>
                </Form>
                    <Row>
                      <Col className="text-center">
                          <Button className="btnGithub"><Octicon name="mark-github"/> Sign Up with Github</Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                          <Button color="link" onClick={ () => this.redirectionLogin() }>Sign In</Button>
                      </Col>
                    </Row>
              </Col>
            </Row>
          </Container>
      </div>
    );
  }

}
