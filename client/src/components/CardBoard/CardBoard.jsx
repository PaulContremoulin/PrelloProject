// Modules
import React from 'react';
import './CardBoard.css';

import {Card, ListGroupItem, ListGroup, CardHeader, Button, CardBody, CardText, ModalFooter, Modal, ModalBody, ModalHeader} from 'reactstrap';
// Actions & Constant
import {addBoardCircle, getCirclesUser} from "../../requests/circle";
import {deleteBoardsCircle, editCircle, fetchCircles} from "../../actions/circleActions";
import {connect} from "react-redux";

export class CardBoardToBeConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    };

    addBoardInCircle = (boardId, circleId) => {
        addBoardCircle(boardId, circleId)
            .then(res => {
                if (res.status === 201) {
                    console.log(this.props.circles)
                    console.log(res.data);
                    this.props.editCircle(res.data);
                    getCirclesUser(this.props.user.member._id)
                        .then(res => {
                            this.props.fetchCircles(res.data)
                        })
                        .catch(error => {
                            console.log(error)
                        });
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err);
            })
    };


    render() {
      const { board, goToPageBoard } = this.props;
        console.log(this.props.circles)
        return (
            <div>
            <Card style={{ borderBottomColor: board.prefs.background, borderBottomWidth: 4}}>
                <CardHeader>
                        {this.props.board.name}
                          <Button className="float-right" onClick={this.toggle} close>+</Button>
                </CardHeader>
                <CardBody onClick={ () => goToPageBoard() }>
                    <CardText>{this.props.board.desc}</CardText>
                </CardBody>
            </Card>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader>Add {this.props.board.name} in circles</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        {this.props.circles.map(circle => {
                            console.log(circle)
                            const filt = circle.idBoards.filter(board => board === this.props.board._id);
                            console.log(filt);
                            if (filt.length === 0) {
                                return (
                                    <ListGroupItem tag="a" onClick={() => this.addBoardInCircle(this.props.board._id, circle._id)} action>{circle.name}</ListGroupItem>
                                )
                        } else {
                                return (
                                    <ListGroupItem disabled>{circle.name}</ListGroupItem>
                                )
                            }
                        })}
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>OK</Button>
                </ModalFooter>
            </Modal>
            </div>
        )
    }
}

const mapStateToProps = ( state, props ) => ({
    user : state.user,
    circles: state.circles,
});

const mapDispatchToProps = ( dispatch ) => ({
    deleteBoardsCircle: (res) => dispatch(deleteBoardsCircle(res)),
    editCircle: (res) => dispatch(editCircle(res)),
    fetchCircles: (res) => dispatch( fetchCircles(res)),
});

export const CardBoard = connect(
    mapStateToProps,
    mapDispatchToProps,
)( CardBoardToBeConnected );
