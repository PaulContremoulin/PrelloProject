// Modules
import React from 'react';
import {Button, Row, Col, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import Popup from "reactjs-popup";

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
            'idOrganization': '',
            'desc': '',
            'memberships': [''],
            'color': '',
        }
    }

    openModal (){
        this.setState({ open: true })
    }

    closeModal () {
        this.setState({
            open: false,
            'name':'',
            'idOrganization': null,
            'desc':'',
            'memberships': [''],
            'color':'',
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
            color = this.state.color,
            desc = this.state.desc,
            idOrganization = this.state.idOrganization,
            memberships = this.state.memberships,
            username = this.props.user.login.username;
        createBoard(username, name, idOrganization, desc, memberships)
         .then(res => {
             console.log("ok");
             //this.props.addBoard(res)
                this.closeModal()
         })
         .catch(
             this.setState({
                 visible: true,
                 'name':'',
                 'color':'',
                 'description':'',
             })
         )
    };

    onDismiss = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        const { name, color, description } = this.state;
        return (
            <div>
                <Button className="button" onClick={() => this.openModal() }> Add a board </Button>
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={() =>this.closeModal() }
                >
                    <Col>
                        <h2 align="center">Add a board</h2>
                        <Alert color="info" isOpen={this.state.visible} toggle={() =>this.onDismiss() }>
                            The board was not able to be created
                        </Alert>
                        <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                            <Row>
                                <Col sm="12" md="6">
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
                                <Col sm="12" md="6">
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
                                            name="description"
                                            id="exampleText"
                                            placeholder="Enter a description"
                                            value={ description }
                                            required={true}
                                            onChange={ (e) => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="text-center">
                                <Col>
                                    <Button onClick={() =>this.closeModal() }>Return</Button>
                                </Col>
                                <Col className="text-center">
                                    <Button type="submit">Create</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Popup>
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
