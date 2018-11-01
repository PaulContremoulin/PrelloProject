// Modules
import React from 'react';
import {Button, Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import Popup from "reactjs-popup";

// Css
import './CreateBoard.css';

// Actions & Constant
import {createBoard} from "../../requests/boards";
import { connect } from "react-redux";
import {addBoard} from "../../actions/boardActions";
//import {BoardToBeConnected} from "../Board/Board";

export class CreateBoardToBeConnected extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            'name': '',
            'color': '',
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    openModal (){
        this.setState({ open: true })
    }
    closeModal () {
        this.setState({
            open: false,
            'name':'',
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
            color = this.state.color;
        console.log(this.state.name+"/"+this.state.color)
        createBoard(name, color)
         .then(res => {
                this.props.addBoard(res)
                this.closeModal()
         })
         .catch(
             this.closeModal,
             alert("Board not created")
         )
    };

    render() {
        const { name, color } = this.state;
        return (
            <div>
                <Button className="button" onClick={this.openModal}> Add a board </Button>
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <Col>
                        <h2 align="center">Add a board</h2>
                        <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                            <Row>
                                <Col sm="12" md="6">
                                    <FormGroup>
                                        <Label>Board's name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Board's name"
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
                                        <Label>Add a team</Label>
                                        <Input type="select" name="select" id="select">
                                            <option>Team 1</option>
                                            <option>Team 2</option>
                                            <option>Team 3</option>
                                            <option>Team 4</option>
                                            <option>Team 5</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="text-center">
                                <Col>
                                    <Button onClick={this.closeModal}>Return</Button>
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

const mapStateToProps = ( state, props ) => ({})

const mapDispatchToProps = ( dispatch ) => ({
    addBoard: (res) => dispatch( addBoard(res)),
})

export const CreateBoard = connect(
    mapStateToProps,
    mapDispatchToProps,
)( CreateBoardToBeConnected );
