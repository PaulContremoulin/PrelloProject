// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Row, Button, Col, Form, Modal, ModalFooter, ModalBody, ModalHeader, Alert, FormGroup, Label, Input} from 'reactstrap';

// Css...
import './ChangeInformation.css';

// Actions & Constant
import {changeInformationAction} from "../../../actions/signActions";
import {changeInformationUser} from "../../../requests/user";

export class ChangeInformationToBeConnected extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            isValid: true,
            'firstName': "",
            'lastName': "",
            'organization': "",
            'bio': "",
        }
    }


    openModal (){
        this.setState({ open: true })
    }

    closeModal (member) {
        this.setState({
            open: false,
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

    handleReset = (member) => {
        this.setState({
            'firstName': member.firstName,
            'lastName': member.lastName,
            'organization': member.organization,
            'bio': member.bio,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        changeInformationUser(this.props.user.member._id, this.state.firstName, this.state.lastName, this.state.organization, this.state.bio)
            .then(res => {
                if(res.status === 200) {
                    const userEdit = {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        organization: this.state.organization,
                        bio: this.state.bio
                    }
                    this.props.changeInformationAction(userEdit)
                }
            })
        this.closeModal()
    };

    onDismiss = (element) => {
        this.setState({
            [element]: true
        });
    };

    render() {
        const { firstName, lastName, organization, bio } = this.state;
        return (
            <div>
                <Button className="float-right butChangeInfo" onClick={() => this.openModal()}>Change Information</Button>
                <Modal isOpen={this.state.open} toggle={() =>this.closeModal() } centered={true}>
                    <ModalHeader toggle={() =>this.closeModal()}>Change Information</ModalHeader>
                    <Form className="form" onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <Alert color="danger" isOpen={!this.state.isValid} toggle={() =>this.onDismiss("isValid") }>
                                The password must contain at least 1 letter and 1 digit.
                                The password must be at least 8 characters long.
                            </Alert>
                            <Row>
                                <Col xs={6}>
                                    <FormGroup>
                                        <Label>Firstname</Label>
                                        <Input
                                            type="text"
                                            name="firstName"
                                            value={ firstName }
                                            required={true}
                                            onChange={ (e) => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs={6}>
                                    <FormGroup>
                                        <Label>Lastname</Label>
                                        <Input
                                            type="text"
                                            name="lastName"
                                            value={ lastName }
                                            required={true}
                                            onChange={ (e) => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Organization</Label>
                                        <Input
                                            type="text"
                                            name="organization"
                                            value={ organization }
                                            required={true}
                                            onChange={ (e) => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Description</Label>
                                        <Input
                                            type="textarea"
                                            name="bio"
                                            value={ bio }
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

    componentDidMount() {
        this.setState({
            firstName: this.props.user.member.firstName,
            lastName: this.props.user.member.lastName,
            organization: this.props.user.member.organization,
            bio: this.props.user.member.bio,
        })
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
    changeInformationAction: (res) => dispatch(changeInformationAction(res)),
});

export const ChangeInformation = connect(
    mapStateToProps,
    mapDispatchToProps
)( ChangeInformationToBeConnected )
