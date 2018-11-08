// Modules
import React from 'react';

import {Card, ListGroupItem, ListGroup, CardHeader, Button, CardBody, CardText, Col, Row, Modal, ModalBody, ModalHeader} from 'reactstrap';
// Actions & Constant
import {addBoardCircle} from "../../requests/circle";
import {deleteBoardsCircle} from "../../actions/circleActions";
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
                    this.toggle();
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
        return (
            <div>
            <Card style={{ backgroundColor: this.props.board.color}}>
                <CardHeader>
                    <Row>
                        <Col xs={9}>
                            {this.props.board.name}
                        </Col>
                            <Col xs={1}>
                                <Button onClick={this.toggle} close>+</Button>
                            </Col>
                    </Row>
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
                            const filt = circle.idBoards.filter(board => board === this.props.board._id);
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
});

export const CardBoard = connect(
    mapStateToProps,
    mapDispatchToProps,
)( CardBoardToBeConnected );

