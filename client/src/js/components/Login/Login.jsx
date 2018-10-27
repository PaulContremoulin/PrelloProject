// Modules
import React from 'react';
import './Login.css';
import { Container, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Css...

// Actions & Constant


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
            validate: {
                emailState: '',
            },
        }
        this.handleChange = this.handleChange.bind(this);
    }

    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'success'
        } else {
            validate.emailState = 'error'
        }
        this.setState({ validate })
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [ name ]: value,
        });
    }

    submitForm(e) {
        e.preventDefault();
        alert(this.state.email+'  '+this.state.password);
    }

    render() {
        const { email, password } = this.state;
        return (
            <Container>
                <Col className="Login" md={{ size: 6, offset: 3 }}>
                    <h2 align="center">Sign In</h2>
                    <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                        <Col>
                            <FormGroup>
                                <Label>Email address</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={ email }
                                    valid={ this.state.validate.emailState === 'success' }
                                    invalid={ this.state.validate.emailState === 'error' }
                                    onChange={ (e) => {
                                        this.validateEmail(e)
                                        this.handleChange(e)
                                    } }
                                />
                                <FormFeedback invalid>
                                    Please input a correct email.
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={ password }
                                    onChange={ (e) => this.handleChange(e) }
                                />
                            </FormGroup>
                        </Col>
                        <Col className="text-center">
                            <Button>Sign In</Button>
                        </Col>
                    </Form>
                    <Col className="text-center">
                        <Button><FontAwesomeIcon icon="github-square" /> Sign In with Github</Button>
                    </Col>
                </Col>
            </Container>
        );
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
}