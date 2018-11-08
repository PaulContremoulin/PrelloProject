// Modules
import React from 'react';
import {Modal,ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

// Css
import './CreateBoard.css';

// Actions & Constant
import {createBoard} from "../../requests/boards";
import { connect } from "react-redux";
import {addBoard} from "../../actions/boardActions";

export class CreateBoardToBeConnected extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'open': false,
            'visible': false,
            'name': '',
            'idOrganization': null,
            'desc': '',
            'memberships': [],
            'color': '#000000',
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
            'idOrganization': null,
            'desc':'',
            'memberships': [],
            'color':'#000000',
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
        const name = this.state.name,
            desc = this.state.desc,
            idOrganization = this.state.idOrganization,
            memberships = this.state.memberships;
        const prefs = {
            'background': this.state.color,
        };
        createBoard(name, idOrganization, desc, memberships, prefs)
            .then(res => {
                this.props.addBoard(res.data)
                this.closeModal()
            })
            .catch(
                this.setState({
                    visible: true,
                    'name':'',
                    'color':'#000000',
                    'desc':'',
                })
            )
    };

    onDismiss = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        const { name, color, desc } = this.state;
        return (
            <div>
                <Button className="button" onClick={() => this.openModal()}> Create a new board </Button>
                <Modal isOpen={this.state.open} toggle={() =>this.closeModal() } centered={true}>
                    <ModalHeader toggle={() =>this.closeModal()}>Add a board</ModalHeader>
                    <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                        <ModalBody>
                            <Alert color="danger" isOpen={this.state.visible} toggle={() =>this.onDismiss() }>
                                The board was not able to be created
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
                                <Col sm="12" md="2">
                                    <FormGroup>
                                        <Label for="exampleColor">Color</Label>
                                        <Input
                                            type="color"
                                            name="color"
                                            id="exampleColor"
                                            placeholder="color placeholder"
                                            value={ color }
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
                                            name="desc"
                                            id="exampleText"
                                            placeholder="Enter a description"
                                            value={ desc }
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
    addBoard: (res) => dispatch( addBoard(res)),
});

export const CreateBoard = connect(
    mapStateToProps,
    mapDispatchToProps,
)( CreateBoardToBeConnected );
