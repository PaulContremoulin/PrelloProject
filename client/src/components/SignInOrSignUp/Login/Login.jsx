// Modules
import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import {history} from '../../../history';
// Css...
import './Login.css';
import Octicon from 'react-octicon';

// Actions & Constant
import {loginUser} from "../../../requests/login";
import {setLogin} from "../../../actions/signActions";


export class LoginToBeConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'badAccount': false,
            'emailConfirmed': true,
            'username': '',
            'password': '',
        };
    }

    handleChange = async (event) => {
        const {target} = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const {name} = target;
        this.setState({
            [name]: value,
        });
    };

    handleReset = () => {
        this.setState({
            'username': '',
            'password': '',
        });
    };

    redirectionRegistration = () => {
        history.push('/registration')
    };

    redirectionResetPassword = () => {
        history.push('/reset/password')
    };

    submitForm = (e) => {
        e.preventDefault();
        const username = this.state.username,
            password = this.state.password;
        loginUser(username, password)
            .then(res => {
                if (res.status === 200) {
                    this.props.setLogin(res.data);
                    history.push('/home')
                } else if (res.status === 403) {
                    this.handleReset();
                    this.setState({emailConfirmed:false, badAccount:false});
                } else {
                    this.handleReset();
                    this.setState({emailConfirmed:true, badAccount:true});
                }
            })
            .catch(err => {
                this.handleReset();
                this.setState({emailConfirmed:true, badAccount:true});
            })
    };

    render() {
        const {username, password, badAccount, emailConfirmed} = this.state;
        return (
            <Container>
                <Row>
                    <Col className="Login" md={{size: 6, offset: 3}}>
                        <h2 align="center">Sign In</h2>
                        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                            <Alert color="danger" isOpen={badAccount} toggle={() =>this.setState({badAccount: false}) }>
                                Error, bad account
                            </Alert>
                            <Alert color="danger" isOpen={!emailConfirmed} toggle={() =>this.setState({emailConfirmed: true}) }>
                                Confirm your email address before login
                            </Alert>
                            <Col>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={username}
                                        required={true}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        required={true}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="text-center">
                                <Button className="btnSign" type="submit">Sign In</Button>
                            </Col>
                        </Form>
                        <Row>
                            <Col className="text-center">
                                <Button className="btnGithub"><Octicon name="mark-github"/> Sign In with Github</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <Button color="link" onClick={() => this.redirectionRegistration()} >Create an account</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <Button color="link" onClick={() => this.redirectionResetPassword()}>Forgotten password ?</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = (dispatch) => ({
    setLogin: (res) => dispatch( setLogin(res)),
});

export const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)( LoginToBeConnected )