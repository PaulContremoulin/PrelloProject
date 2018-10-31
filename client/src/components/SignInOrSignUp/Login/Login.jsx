// Modules
import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

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
            'username': '',
            'password': '',
            'goodAccount': true,
        };
        this.handleChange = this.handleChange.bind(this);
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

    submitForm(e) {
        e.preventDefault();
        const username = this.state.username,
            password = this.state.password;
        loginUser(username, password)
            .then(res => {
                this.props.setLogin(res)
                //Todo : change page vers home
            })
            .catch(
                this.state.goodAccount = false,
                this.handleReset()
            )
    };

    render() {
        const {username, password} = this.state;
        const {onClick} = this.props;
        return (
            <Container>
                <Row>
                    <Col className="Login" md={{size: 6, offset: 3}}>
                        <h2 align="center">Sign In</h2>
                        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
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
                                {this.state.goodAccount ? null :
                                    <Col className="text-center"><span> Error, bad account </span></Col>}
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


