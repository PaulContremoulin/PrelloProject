// Modules
import React from 'react';
import { history } from '../../../history';

// Css...
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import "./ResetPswd.css";

// Actions & Constant
import { resetPswd } from "../../../requests/resetPswd";


export class ResetPswd extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        'email': "",
        'emailIsSent': false,
        'emailNotFound' : false
      }
  }

   handleSubmit = (event) => {
     event.preventDefault();
     const email = this.state.email;
     resetPswd(email,process.env.REACT_APP_FRONT_URL+'/')
     .then( res => (res.status < 400) ? this.setState({ emailIsSent: true, emailNotFound: false }) : this.setState({ emailNotFound: true }) )
     .catch( err => console.log(err) )
   }


   handleChange = async (event) => {
       const value = event.target.value;
       this.setState({
           'email': value,
       });
   };

   onDismiss = (element) => {
       this.setState({
           [element]: false
       });
   };

   redirectionLogin = () => {
       history.push('/login')
   };

  render() {
    const { email, emailIsSent, emailNotFound } = this.state;
    return (
      <div>
        <Container>
          <Row>
            <Col className="ResetPswd" md={{ size: 6, offset: 3 }}>
              <h2 align="center">Reset password</h2>
              <Alert color="success" isOpen={emailIsSent} toggle={() =>this.onDismiss(emailIsSent) }>
                  The link has been sent !
              </Alert>
              <Alert color="danger" isOpen={emailNotFound} toggle={() =>this.onDismiss(emailNotFound) }>
                  Account not found !
              </Alert>
              <Form className="form" onSubmit={this.handleSubmit}>
                <Col>
                  <FormGroup>
                      <Label>Write your email to receive the password's reset link</Label>
                      <Input
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={email}
                          required={true}
                          onChange={(e) => this.handleChange(e)}
                      />
                  </FormGroup>
                </Col>
                <Col className="text-center">
                    <Button color="info">Send</Button>
                </Col>
              </Form>
            <Row>
              <Col className="text-center">
                  <Button color="link" onClick={() => this.redirectionLogin()}>Return to Sign In</Button>
              </Col>
            </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}
