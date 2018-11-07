// Modules
import React from 'react';
import {Modal,ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './CreateCircle.css';

// Actions & Constant
import { connect } from "react-redux";
import {addCircle} from "../../actions/circleActions";
import {createCircle} from "../../requests/circle";

export class CreateCircleToBeConnected extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'open': false,
            'visible': false,
            'name': '',
        }
    }

    openModal (){
        this.setState({ open: true })
    }

    closeModal () {
        this.setState({
            open: false,
            'visible': false,
            'name':'',
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

    submitForm(e) {
        e.preventDefault();
        const name = this.state.name;
        const userId = this.props.user.member._id;
        createCircle(userId, name)
            .then(res => {
                if (res.status === 201){
                    this.props.addCircle(res.data);
                    this.closeModal();
                } else {
                    this.setState({
                        visible: true,
                        'name':'',
                    })
                }
            })
            .catch(err => {
                this.setState({
                    visible: true,
                    'name':'',
                })
            })
    };

    onDismiss = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        const { name } = this.state;
        return (
            <div>
                <div className="iconeAdd">
                    <FontAwesomeIcon icon={faPlusCircle} size="2x" onClick={() => this.openModal()}/>
                </div>
                    <Modal isOpen={this.state.open} toggle={() =>this.closeModal() } centered={true}>
                    <ModalHeader toggle={() =>this.closeModal()}>Add a Circle</ModalHeader>
                    <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                        <ModalBody>
                            <Alert color="danger" isOpen={this.state.visible} toggle={() =>this.onDismiss() }>
                                The circle was not able to be created
                            </Alert>
                            <Row>
                                <Col sm="12" md="8">
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Enter a name"
                                            value={ name }
                                            required={true}
                                            onChange={ (e) => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() =>this.closeModal() }>Return</Button>
                            <Button color="primary" type="submit">Create</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ( state, props ) => ({
    user : state.user,
});

const mapDispatchToProps = ( dispatch ) => ({
    addCircle: (res) => dispatch( addCircle(res)),
});

export const CreateCircle = connect(
    mapStateToProps,
    mapDispatchToProps,
)( CreateCircleToBeConnected );
