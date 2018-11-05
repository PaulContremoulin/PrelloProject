// Modules
import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button, Alert } from 'reactstrap';
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
            'badAccount': true,
            'username': '',
            'password': '',
        });
    };

    onDismiss = () => {
        this.setState({
            'badAccount': false
        });
    };

    submitForm(e) {
        e.preventDefault();
        const username = this.state.username,
            password = this.state.password;
        loginUser(username, password)
            .then(res => ( res.status < 400 ) ? this.props.setLogin(res.data) : Promise.reject("Error") )
            .then( () => history.push('/home') )
            .catch(
                this.handleReset()
            )
    };

    render() {
        const {username, password, badAccount} = this.state;
        const {onClick, toggleResetPswd} = this.props;
        return (
            <Container>
                <Row>
                    <Col className="Login" md={{size: 6, offset: 3}}>
                        <h2 align="left">Sign In</h2>
                        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                            <Alert color="danger" isOpen={badAccount} toggle={() =>this.onDismiss() }>
                                Error, bad account
                            </Alert>
                            <Col>
                                <InputGroup>
                                    <InputGroupAddon addonType={"prepend"}><Octicon name="person" className={"icon"}/></InputGroupAddon>
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={username}
                                        required={true}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </InputGroup>
                            </Col>
                            < br />
                            <Col>
                                <FormGroup>
                                    <Label><Octicon name="key" className={"icon"}/>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        required={true}
                                        onChange={(e) => this.handleChange(e)}
                                    /></Label>
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
                                <Button color="link" onClick={onClick}>Create an account</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <Button color="link" onClick={toggleResetPswd}>Forgotten password ?</Button>
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
