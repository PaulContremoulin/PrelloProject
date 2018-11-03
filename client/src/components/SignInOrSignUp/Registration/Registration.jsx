// Modules
import React from 'react';
import './Registration.css';
import { registerUser } from '../../../requests/registration';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Octicon from 'react-octicon'

// Css...

// Actions & Constant


export class Registration extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        "stepOne" : true,
        "stepTwo" : false,
        "username" : "",
        "firstName" : "",
        "lastName" : "",
        "email" : "",
        "passwordA" : "",
        "passwordB" : "",
        "organisation" : "",
        "allFieldsFilled" : true,
        "passwordsMatch" : true,
        "emailIsValid" : true
      }
  }

  changeStep = () => {
    this.setState({
      stepOne: !this.state.stepOne,
      stepTwo: !this.state.stepTwo
    })
  }

  changeToStepTwo = (state) => {
    if ( state.username === "" || state.firstName === "" || state.lastName === "" || state.email === "" || state.passwordA === "" || state.passwordB === "") {
      this.setState({ allFieldsFilled: false });
    } else if ( state.passwordA !== state.passwordB ) {
      this.setState({ allFieldsFilled: true, passwordsMatch: false });
    } else if ( !state.emailIsValid ) {
      this.setState({ allFieldsFilled: true, passwordsMatch: true });
    } else {
      this.setState({ allFieldsFilled: true, passwordsMatch: true, emailIsValid: true });
      this.changeStep();
    }
  }

  setStateElement = (element, value) => {
    this.setState({
      [ element ]: value
    })
  }

   handleSubmit = event => {
     event.preventDefault();
     const username = this.state.username,
          firstName = this.state.firstName,
          lastName = this.state.lastName,
          email = this.state.email,
          passwordA = this.state.passwordA
          organisation = this.state.organisation;
     registerUser(username, firstName, lastName, email, passwordA, organisation);
    const { onClick } = this.props;
    onClick();
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


  render() {
    const { stepOne, stepTwo } = this.state;
    const { onClick } = this.props;
    return (
      <div>
        <Container>
          <Row>
            <Col className="Registration" md={{ size: 6, offset: 3 }}>
              <h2 align="center">Sign Up</h2>
              <Row>
                <Form className="form" onSubmit={this.handleSubmit}>
                  { (stepOne && !stepTwo) ? (
                      <div>
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
                        <Row>
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
                        </Row>
                          <Row>
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
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup>
                                  <Label for="firstPassword">Password</Label>
                                  <Input
                                      type="password"
                                      name="passwordA"
                                      placeholder="Password"
                                      required={true}
                                      onBlur={( event ) => this.handleOnBlur( event, "passwordA" )}
                                  />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
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
                          </Row>
                          <Row>
                            <Col className="text-center">
                                <Button className="btnSign" onClick={ () => this.changeToStepTwo(this.state) }>Sign Up</Button>
                            </Col>
                        </Row>
                      </div>
                    ) : (
                      <div>
                        <Col>
                          <FormGroup>
                              <Label>Organisation</Label>
                              <Input
                                  type="text"
                                  name="organisation"
                                  onBlur={( event ) => this.handleOnBlur( event, "organisation" )}
                              />
                          </FormGroup>
                      </Col>
                          <Row>
                      <Col md="6" className="text-center">
                        <Button className="btnSign">Sign Up</Button>
                      </Col>
                      <Col md="6" className="text-center">
                        <Button className="btnReturn" onClick={ () => this.changeStep() }>Return</Button>
                      </Col>
                          </Row>
                    </div>
                  )}
                  </Form>
                </Row>
                { this.state.allFieldsFilled ? null :
                  <Col className="text-center"><span> You need to fill all fields </span></Col> }
                { this.state.passwordsMatch ? null :
                  <Col className="text-center"><span> The passwords do not match </span></Col> }
                { this.state.emailIsValid ? null :
                  <Col className="text-center"><span> The email is not valid </span></Col> }
                { (stepOne && !stepTwo) ? (
                  <div>
                    <Row>
                      <Col className="text-center">
                          <Button className="btnGithub"><Octicon name="mark-github"/> Sign Up with Github</Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                          <Button color="link" onClick={ onClick }>Sign In</Button>
                      </Col>
                    </Row>
                  </div>
                ) : null }
              </Col>
            </Row>
          </Container>
      </div>
    );
  }

}
