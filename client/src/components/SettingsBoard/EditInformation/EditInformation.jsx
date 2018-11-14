// Modules
import React from 'react';
import { connect } from 'react-redux';
import {history} from "../../../history";
import {Row, Button, Col, Form, Modal, ModalFooter, ModalBody, ModalHeader, Alert, FormGroup, Label, Input} from 'reactstrap';

// Css...
import './EditInformation.css';

// Actions & Constant
import {changeInformationBoard, getBoardsUser} from "../../../requests/boards";
import {editInformationsBoard} from "../../../actions/boardActions";
import {fetchBoards} from "../../../actions/boardActions";


export class EditInformationToBeConnected extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            isValid: true,
            'name': "",
            'desc': "",
        }
    }


    openModal (){
        this.setState({ open: true })
    }

    closeModal () {
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

    handleReset = (board) => {
        this.setState({
            'name': board.firstName,
            'desc': board.lastName,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        changeInformationBoard(this.props.board._id,this.state.name, this.state.desc, this.props.board.closed)
            .then(res => {
                if (res.status === 200){
                    const board = {
                        name: this.state.name,
                        desc: this.state.desc,
                    }
                    this.props.editInformationsBoard(board)
                    const nbrBoardsArchived = this.props.boards.filter(board => board.closed === true).length
                    let temp = "";
                    if (nbrBoardsArchived !== 0) {
                        temp = "true"
                    } else {
                        temp = "false"
                    }
                    getBoardsUser(this.props.user.member._id,temp)
                        .then(res => {
                            this.props.fetchBoards(res.data)
                        })
                        .catch(error => {
                            console.log(error)
                        });
                    this.closeModal()
                    history.push('/board/'+this.props.board._id+'/'+this.state.name+'/settings')
                }
            })
    };

    onDismiss = (element) => {
        this.setState({
            [element]: true
        });
    };

    render() {
        const { name, desc} = this.state;
        return (
            <div>
                <Button onClick={() => this.openModal()}>Change Information</Button>
                <Modal isOpen={this.state.open} toggle={() =>this.closeModal() } centered={true}>
                    <ModalHeader toggle={() =>this.closeModal()}>Change Information</ModalHeader>
                    <Form className="form" onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <Alert color="danger" isOpen={!this.state.isValid} toggle={() =>this.onDismiss("isValid") }>
                                Error
                            </Alert>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={ name }
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
                                            value={ desc }
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
            name: this.props.board.name,
            desc: this.props.board.desc,
        })
    }
}

const mapStateToProps = (state, props) => ({
    board: state.board,
    boards: state.boards,
    user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
    editInformationsBoard: (res) => dispatch(editInformationsBoard(res)),
    fetchBoards: (res) => dispatch(fetchBoards(res)),
});

export const EditInformation = connect(
    mapStateToProps,
    mapDispatchToProps
)( EditInformationToBeConnected )
