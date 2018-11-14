// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Row, Button, Col, Form, Modal, ModalFooter, ModalBody, ModalHeader, Alert, FormGroup, Label, Input} from 'reactstrap';
import {changePasswordUser} from "../../../requests/user";

// Css...
import './ChangePassword.css';

// Actions & Constant

export class ChangePasswordToBeConnected extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            'oldPassword':'',
            'newPassword':'',
            'newPasswordConfirm':'',
            "passwordsMatch" : true,
            "passwordIsValid" : true,
            "passwordResetGood": true,
            "oldPasswordValid": true,
        }
    }


    openModal (){
        this.setState({ open: true })
    }

    closeModal () {
        this.setState({
            open: false,
            'visible': false,
            'oldPassword':'',
            'newPassword':'',
            'newPasswordConfirm':'',
            "passwordsMatch" : true,
            "passwordIsValid" : true,
            "oldPasswordValid": true,
        })
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        this.setState({
            [ name ]: value,
        });
    };

    handleReset = () => {
        this.setState({
            'oldPassword':'',
            'newPassword':'',
            'newPasswordConfirm':'',
        })
    }

    validatePassword = (e) => {
        const pswdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/g;
        if (pswdRegex.test(e.target.value)) {
            this.setState({ passwordIsValid: true})
        } else {
            this.setState({ passwordIsValid: false})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.newPassword !== this.state.newPasswordConfirm) {
            this.handleReset();
            this.setState({
                passwordsMatch: false,
            });
        } else {
            changePasswordUser(this.state.oldPassword, this.state.newPassword, this.props.user.member._id)
                .then(res => {
                    if(res.status === 200) {
                        this.setState({passwordResetGood: true})
                        this.closeModal()
                    } else {
                        this.setState({oldPasswordValid: false})
                        this.handleReset()
                    }
                })
                .catch(err => {
                    this.setState({passwordResetGood: false})
                    this.handleReset()
                })
        }
    };

    onDismiss = (element) => {
        this.setState({
            [element]: true
        });
    };

    render() {
        const { oldPassword, newPassword, newPasswordConfirm } = this.state;
        return (
            <div>
                <Button className="float-right butDeleteUser" onClick={() => this.openModal()}>Change Password</Button>
                <Modal isOpen={this.state.open} toggle={() =>this.closeModal() } centered={true}>
                    <ModalHeader toggle={() =>this.closeModal()}>Change Password</ModalHeader>
                    <Form className="form" onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <Alert color="danger" isOpen={!this.state.passwordIsValid} toggle={() =>this.onDismiss("passwordIsValid") }>
                                The password must contain at least 1 letter and 1 digit.
                                The password must be at least 8 characters long.
                            </Alert>
                            <Alert color="danger" isOpen={!this.state.passwordsMatch}
                                   toggle={() => this.onDismiss("passwordsMatch")}>
                                The passwords do not match.
                            </Alert>
                            <Alert color="danger" isOpen={!this.state.passwordResetGood}
                                   toggle={() => this.onDismiss("passwordResetGood")}>
                                Error
                            </Alert>
                            <Alert color="danger" isOpen={!this.state.oldPasswordValid}
                                   toggle={() => this.onDismiss("oldPasswordValid")}>
                                Old password isn't valid
                            </Alert>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Old Password</Label>
                                        <Input
                                            type="password"
                                            name="oldPassword"
                                            placeholder="Enter old password"
                                            value={ oldPassword }
                                            required={true}
                                            onChange={ (e) => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>New Password</Label>
                                        <Input
                                            type="password"
                                            name="newPassword"
                                            placeholder="Enter new password"
                                            value={ newPassword }
                                            required={true}
                                            onChange={ (e) => this.handleChange(e)}
                                            onBlur={(event) => this.validatePassword(event)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Confirm New Password</Label>
                                        <Input
                                            type="password"
                                            name="newPasswordConfirm"
                                            placeholder="Confirm new password"
                                            value={ newPasswordConfirm }
                                            required={true}
                                            onChange={ (e) => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() =>this.closeModal() }>Return</Button>
                            <Button color="primary" type="submit">Change</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    board: state.board,
    user: state.user,
});
const mapDispatchToProps = (dispatch) => ({});

export const ChangePassword = connect(
    mapStateToProps,
    mapDispatchToProps
)( ChangePasswordToBeConnected )
