// Modules
import React from 'react';
import {Container, Row, Col, Button, ModalHeader, ModalBody, ModalFooter, Modal, Alert} from 'reactstrap';
import {history} from "../../history";

// Css...

// Actions & Constant
import {connect} from "react-redux";
import {CardBoardCircle} from "../CardBoardCircle/CardBoardCircle";
import {deleteCircleRequest} from "../../requests/circle";
import {deleteCircle, setCircle} from "../../actions/circleActions";
import {getListsOfBoard} from "../../requests/boards";
import {setBoard} from "../../actions/boardActions";

export class ContentCircleToBeConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    };

    deleteCircle = (circleId) => {
        deleteCircleRequest(circleId)
            .then(res => {
                if (res.status === 200) {
                    this.props.deleteCircle(circleId);
                    history.push('/home');
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    goToPageBoard = (board) => {
        getListsOfBoard(board._id, true)
            .then( lists => {
                const setupBoard = board;
                setupBoard["lists"] = lists.data;
                this.props.setBoard(setupBoard);
            })
            .then( () => history.push('/board'))
    }

    render() {
        return (
            <div>
                {this.props.circle.name !== undefined &&
                <div>
                    <Container className="contentHome">
                        <Row>
                            <Col xs={10}>
                                <h2>{this.props.circle.name}</h2>
                            </Col>
                            <Col xs={2}>
                                <Button color="danger" onClick={this.toggle}>Delete</Button>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="contentBoard">
                        <Row>
                            {this.props.circle.idBoards.length !== 0 ? this.props.circle.idBoards.map(board => {
                                    return (
                                        <Col className="displayBoard" xs={12} sm={6} md={3}>
                                            <CardBoardCircle goToPageBoard={() => this.goToPageBoard(board)}
                                                             board={board} key={board._id} circle={this.props.circle}/>
                                        </Col>
                                    )
                                })
                                :
                                <Alert color="primary">
                                    {"Go to personnal's board to add boards in " + this.props.circle.name}
                                </Alert>
                            }
                        </Row>
                    </Container>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalBody>Do you want delete this circle ? </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            <Button color="danger"
                                    onClick={() => this.deleteCircle(this.props.circle._id)}>Delete</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ( state, props ) => ({
    user : state.user,
    circle: state.circle,
    circles: state.circles,
});

const mapDispatchToProps = ( dispatch ) => ({
    deleteCircle: (res) => dispatch(deleteCircle(res)),
    setBoard: (board) => dispatch( setBoard(board)),
    setCircle: (res) => dispatch( setCircle(res)),
});

export const ContentCircle = connect(
    mapStateToProps,
    mapDispatchToProps,
)( ContentCircleToBeConnected );