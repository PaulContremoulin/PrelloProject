// Modules
import React from 'react';
import { history } from '../../../history';
import * as qs from 'query-string';

// Css...
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './ChangePswd.css';

// Actions & Constant
import {NavBar} from "../../NavBar/NavBar";

export class ChangePswd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "newPassword": "",
            "newPasswordConfirm": "",
            "passwordsMatch" : true,
            "passwordIsValid" : true,
        }
    }

    validatePassword = (e) => {
        const pswdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/g;
        if (pswdRegex.test(e.target.value)) {
            this.setState({ passwordIsValid: true, newPassword: e.target.value })
        } else {
            this.setState({ passwordIsValid: false, newPassword: e.target.value })
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
            this.setState({ passwordsMatch: false });
        } else {
            //todo : envoyer le mdp au back
            history.push('/');
        }
    };

    setStateElement = (element, value) => {
        this.setState({
            [ element ]: value
        })
    };

    handleOnBlur = ( event, element ) => {
        this.setStateElement( element, event.target.value );
    };

    render() {
        const parsed = qs.parse(this.props.location.search);
        const token = parsed.token;
        console.log(parsed);
        console.log(parsed.token !== undefined);
        //const token = parsed.token;
        return (
            <div>
                <NavBar changepswd="true"/>
                <Container>
                    {(token !== undefined) ?
                        <Row>
                            <Col className="ResetPswd" md={{size: 6, offset: 3}}>
                                <h2 align="center">Reset password</h2>
                                <Form className="form" onSubmit={this.handleSubmit}>
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
                                                required={true}
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
                                                required={true}
                                                onBlur={(event) => this.handleOnBlur(event, "newPasswordConfirm")}
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

}