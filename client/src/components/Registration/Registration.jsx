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
      }
  }

  changeStep = () => {
    this.setState({
      stepOne: !this.state.stepOne,
      stepTwo: !this.state.stepTwo
    })
  }



  render() {
    const { stepOne, stepTwo } = this.state;
    const { onClick } = this.props;
    return (
      <div>
        {
          (stepOne && !stepTwo) ?
          <Container>
            <Row>
              <Col className="Registration" md={{ size: 6, offset: 3 }}>
                <h2 align="center">Sign Up</h2>
                <Row>
                  <Form className="form">
                    <Row>
                      <Col>
                        <FormGroup>
                            <Label>First name</Label>
                            <Input
                                type="text"
                                name="firstname"
                                placeholder="First name"
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
                                />
                            </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center">
                            <Button onClick={ () => this.changeStep() }>Sign Up</Button>
                        </Col>
                    </Row>
                  </Form>
                </Row>
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
              </Col>
            </Row>
          </Container>
          :
          <Container>
              <Col className="Registration" md={{ size: 6, offset: 3 }}>
                  <h2 align="center">About your status</h2>
                  <Form className="form">
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
                          <Label>Already have an account ?</Label>
                          <Button>Sign Up</Button>
                      </Col>
                  </Form>
              </Col>
          </Container>
        }
      </div>
    );
  }

}
