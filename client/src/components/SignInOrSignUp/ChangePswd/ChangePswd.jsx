// Modules
import React from 'react';
import { history } from '../../../history';
import * as qs from 'query-string';

// Css...
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './ChangePswd.css';

// Actions & Constant
import {NavBar} from "../../NavBar/NavBar";
import { changePswd, checkToken } from "../../../requests/resetPswd";

export class ChangePswd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "newPassword": "",
            "newPasswordConfirm": "",
            "passwordsMatch" : true,
            "passwordIsValid" : true,
            "changePasswordGood":true,
            "tokenValid": true,
        }
    }

    handleReset = () => {
        this.setState({
            'newPassword': "",
            'newPasswordConfirm': "",
        });
    };

    handleChange = async (event) => {
        const {target} = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const {name} = target;
        this.setState({
            [name]: value,
        });
    };

    validatePassword = (e) => {
        const pswdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/g;
        if (pswdRegex.test(e.target.value)) {
            this.setState({ passwordIsValid: true})
        } else {
            this.setState({ passwordIsValid: false})
        }
    }

    onDismiss = (element) => {
        this.setState({
            [element]: true
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if( this.state.newPassword !== this.state.newPasswordConfirm) {
            this.handleReset();
            this.setState({
                passwordsMatch: false,
            });
        } else {
            changePswd(qs.parse(this.props.location.search).token, this.state.newPassword, this.props.match.params.idmembre)
                .then(res => (res.status === 200) ? history.push('/login') : this.setState({ changePasswordGood: false, newPassword:"", newPasswordConfirm:"" }))
                .catch(this.setState({ changePasswordGood: false, newPassword:"", newPasswordConfirm:"" }))
        }
    };

    setStateElement = (element, value) => {
        this.setState({
            [ element ]: value
        })
    };

    render() {
        const {newPassword, newPasswordConfirm} = this.state;
        return (
            <div>
                <Container>
                    {(this.state.tokenValid) ?
                        <Row>
                            <Col className="ResetPswd" md={{size: 6, offset: 3}}>
                                <h2 align="center">Reset password</h2>
                                <Form className="form" onSubmit={this.handleSubmit}>
                                    <Alert color="danger" isOpen={!this.state.changePasswordGood}
                                           toggle={() => this.onDismiss("changePasswordGood")}>
                                        Reset password is not good, start again !
                                    </Alert>
                                    <Alert color="danger" isOpen={!this.state.passwordsMatch}
                                           toggle={() => this.onDismiss("passwordsMatch")}>
                                        The passwords do not match.
                                    </Alert>
                                    <Alert color="danger" isOpen={!this.state.passwordIsValid}
                                           toggle={() => this.onDismiss("passwordIsValid")}>
                                        The password must contain at least 1 letter and 1 digit.
                                        The password must be at least 8 characters long.
                                    </Alert>
                                    <Col>
                                        <FormGroup>
                                            <Label for="firstPassword">New Password</Label>
                                            <Input
                                                type="password"
                                                name="newPassword"
                                                placeholder="New Password"
                                                value={newPassword}
                                                required={true}
                                                onChange={(e) => this.handleChange(e)}
                                                onBlur={(event) => this.validatePassword(event)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="secondPassword">Confirm New Password</Label>
                                            <Input
                                                type="password"
                                                name="newPasswordConfirm"
                                                placeholder="Confirm New Password"
                                                value={newPasswordConfirm}
                                                required={true}
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="text-center">
                                        <Button color="info">Reset</Button>
                                    </Col>
                                </Form>
                            </Col>
                        </Row>
                        :
                        <Row>
                            <Col>
                                <Alert className="linkOut" color="danger">
                                    Invalid link !
                                </Alert>
                            </Col>
                        </Row>
                    }
                </Container>
            </div>
        );
    }

    componentDidMount() {
        const token = qs.parse(this.props.location.search).token;
        const idMembre = this.props.match.params.idmembre;
        checkToken(token, idMembre)
            .then(res => res.status === 200 ? this.setState({tokenValid:true}) : this.setState({tokenValid:false}))
            .catch(this.setState({tokenValid:false}))
    }

}
