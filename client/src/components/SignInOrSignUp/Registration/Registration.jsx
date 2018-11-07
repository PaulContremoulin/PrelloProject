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
        "emailIsValid" : true,
          "emailExist" : false,
          "usernameExist" : false,
          "emailUsernameExist": false,
          "badRequest": false
      }
  }

  setStateElement = (element, value) => {
    this.setState({
      [ element ]: value
    })
  };

  resetInput = () => {
      this.setState({
          "passwordA" : "",
          "passwordB" : "",
          "allFieldsFilled" : true,
          "passwordsMatch" : true,
          "passwordIsValid" : true,
          "emailIsValid" : true,
      })
  };

   handleSubmit = (e) => {
       e.preventDefault();
       if ( this.state.username === "" || this.state.firstName === "" || this.state.lastName === "" || this.state.email === "" || this.state.passwordA === "" || this.state.passwordB === "") {
           this.resetInput();
           this.setState({ allFieldsFilled: false });
       } else if ( this.state.passwordA !== this.state.passwordB ) {
           this.resetInput();
           this.setState({ allFieldsFilled: true, passwordsMatch: false });
       } else if ( !this.state.emailIsValid ) {
           this.resetInput();
           this.setState({ allFieldsFilled: true, passwordsMatch: true });
       } else if ( !this.state.passwordIsValid ) {
           this.resetInput();
           this.setState({ allFieldsFilled: true, passwordsMatch: true, emailIsValid: true });
       } else {
           this.setState({ allFieldsFilled: true, passwordsMatch: true, emailIsValid: true, passwordIsValid: true });
           const username = this.state.username,
               firstName = this.state.firstName,
               lastName = this.state.lastName,
               email = this.state.email,
               passwordA = this.state.passwordA,
               organisation = this.state.organisation;
           registerUser(username, firstName, lastName, email, passwordA, organisation, process.env.REACT_APP_FRONT_URL+'/login')
               .then(res => {
                   if (res.status === 200) {
                       history.push('/login');
                   } else if (res.status === 400) {
                       if ((res.data.message.message.errors.username !== undefined) && (res.data.message.message.errors.email !== undefined)) {
                           this.resetInput();
                           this.setState({
                               usernameExist: false,
                               emailExist: false,
                               badRequest: false,
                               emailUsernameExist: true
                           });
                       } else if (res.data.message.message.errors.email !== undefined) {
                           this.resetInput();
                           this.setState({
                               emailExist: true,
                               usernameExist: false,
                               badRequest: false,
                               emailUsernameExist: false
                           });
                       } else if (res.data.message.message.errors.username !== undefined) {
                           this.resetInput();
                           this.setState({
                               emailExist: false,
                               usernameExist: true,
                               badRequest: false,
                               emailUsernameExist: false
                           });
                       } else {
                           this.resetInput();
                           this.setState({
                               emailExist: false,
                               usernameExist: false,
                               badRequest: true,
                               emailUsernameExist: false
                           });
                       }
                   } else if (res.status === 204) {
                       console.log("ok");
                   } else {
                       this.resetInput();
                       this.setState({emailExist:false, usernameExist:false, badRequest:true, emailUsernameExist:false});
                   }
               })
               .catch(err => {
                   this.resetInput();
                   this.setState({emailExist:false, usernameExist:false, badRequest:true, emailUsernameExist:false});
               })
       }
   }

    handleChange = async (event) => {
        const {target} = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const {name} = target;
        this.setState({
            [name]: value,
        });
    };

   validateEmail = (e) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(e.target.value)) {
        this.setState({ emailIsValid: true })
    } else {
      this.setState({ emailIsValid: false })
    }
  }

  validatePassword = (e) => {
    const pswdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/g;
    if (pswdRegex.test(e.target.value)) {
      this.setState({ passwordIsValid: true })
    } else {
      this.setState({ passwordIsValid: false })
    }
  };

  redirectionLogin = () => {
      history.push('/login')
  }

  render() {
      const {firstName, lastName, username, email, passwordA, passwordB, organisation} = this.state;
    return (
      <div>
        <Container>
          <Row>
            <Col className="Registration" md={{ size: 6, offset: 3 }}>
              <h2 align="center">Sign Up</h2>
              <Alert color="danger" isOpen={!this.state.allFieldsFilled} toggle={() =>this.setState({allFieldsFilled:true}) }>
                  You need to fill all fields.
              </Alert>
              <Alert color="danger" isOpen={!this.state.passwordsMatch} toggle={() =>this.setState({passwordsMatch:true}) }>
                  The passwords do not match.
              </Alert>
              <Alert color="danger" isOpen={!this.state.passwordIsValid} toggle={() =>this.setState({passwordIsValid:true}) }>
                The password must contain at least 1 letter and 1 digit.
                The password must be at least 8 characters long.
              </Alert>
              <Alert color="danger" isOpen={!this.state.emailIsValid} toggle={() =>this.setState({emailIsValid:true}) }>
                  The email is not valid.
              </Alert>
                <Alert color="danger" isOpen={(this.state.emailUsernameExist)} toggle={() =>this.setState({emailUsernameExist:false}) }>
                    Email and username already exists !
                </Alert>
                <Alert color="danger" isOpen={this.state.emailExist} toggle={() => this.setState({emailExist:false}) }>
                    Email already exists !
                </Alert>
                <Alert color="danger" isOpen={this.state.usernameExist} toggle={() => this.setState({usernameExist:false}) }>
                    Username already exists !
                </Alert>
                <Alert color="danger" isOpen={this.state.badRequest} toggle={() => this.setState({badRequest:false}) }>
                    Error, registration doesn't work !
                </Alert>
              <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
                      <Col>
                        <Row>
                          <Col>
                            <FormGroup>
                                <Label>First name</Label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    value={firstName}
                                    required={true}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                                <Label>Last name</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={lastName}
                                    required={true}
                                    onChange={(e) => this.handleChange(e)}
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
                                value={username}
                                invalid={this.state.usernameExist || this.state.emailUsernameExist}
                                required={true}
                                onChange={(e) => this.handleChange(e)}
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
                                value={email}
                                invalid={this.state.emailExist || this.state.emailUsernameExist}
                                required={true}
                                onChange={(e) => this.handleChange(e)}
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
                                value={passwordA}
                                invalid={!this.state.passwordIsValid || !this.state.passwordsMatch}
                                required={true}
                                onChange={(e) => this.handleChange(e)}
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
                                  value={passwordB}
                                  invalid={!this.state.passwordsMatch}
                                  required={true}
                                  onChange={(e) => this.handleChange(e)}
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
                                    value={organisation}
                                    onChange={(e) => this.handleChange(e)}
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
