// Modules
import React from 'react';
import './Registration.css';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Css...

// Actions & Constant


export class Registration extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        "stepOne" : true,
        "stepTwo" : false,
        "userName" : "",
        "firstName" : "",
        "lastname" : "",
        "email" : "",
        "passwordA" : "",
        "organisation" : "",
      }
  }

  changeStep = () => {
    this.setState({
      stepOne: !this.state.stepOne,
      stepTwo: !this.state.stepTwo
    })
  }


 handleSubmit = event => {
   event.preventDefault();
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
                          <Col>
                            <FormGroup>
                                <Label>First name</Label>
                                <Input
                                    type="text"
                                    name="firstname"
                                    placeholder="First name"
                                    required={true}
                                />
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                                <Label>Last name</Label>
                                <Input
                                    type="text"
                                    name="lastname"
                                    placeholder="Last name"
                                    required={true}
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
                                    />
                                </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="text-center">
                                <Button onClick={ () => this.changeStep() }>Sign Up</Button>
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
                              />
                          </FormGroup>
                      </Col>
                      <Col className="text-center">
                        <Button color="primary">Sign Up</Button>
                      </Col>
                      <Col className="text-center">
                        <Button onClick={ () => this.changeStep() }>Return</Button>
                      </Col>
                    </div>
                  )}
                  </Form>
                </Row>
                { (stepOne && !stepTwo) ? (
                  <div>
                    <Row>
                      <Col className="text-center">
                          <Button><FontAwesomeIcon icon="github-square" />Sign Up with Github</Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                          <Button color="info" onClick={ onClick }>Sign In</Button>
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
