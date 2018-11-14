// Modules
import React from 'react';
import './CardBoard.css';
import {Row, Col, Card, ListGroupItem, ListGroup, CardHeader, Button, CardBody, CardText, ModalFooter, Modal, ModalBody, ModalHeader, CardFooter} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';

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
        return (
            <div>
            <Card style={{ borderBottomColor: board.prefs.background, borderBottomWidth: 4}}>
                <CardHeader className="headerBoardCard">
                    <div className="butHeaderCard">
                        {this.props.board.name}
                          <Button className="float-right" onClick={this.toggle} close>+</Button>
                    </div>
                </CardHeader>
                <CardBody className="clickBoard" onClick={ () => goToPageBoard() }>
                    <CardText className="ellipsisCard">{this.props.board.desc}</CardText>
                    <hr className="my-2"/>
                    {this.props.board.memberships.length !== 1 ?
                        <div className="footerCardBoard">
                            {this.props.board.memberships.length + ' '}<FontAwesomeIcon icon={faUsers} size="sm"/>
                        </div>
                        :
                        <div className="footerCardBoard">
                            <FontAwesomeIcon icon={faUser} size="sm"/>{' personnal'}
                        </div>
                    }
                </CardBody>
            </Card>
            <Modal centered={true} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader>Add {this.props.board.name} in circles</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        {this.props.circles.map(circle => {
                            const filt = circle.idBoards.filter(board => board === this.props.board._id);
                            if (filt.length === 0) {
                                return (
                                    <ListGroupItem key={circle._id}  className="clickBoard2" tag="a" onClick={() => this.addBoardInCircle(this.props.board._id, circle._id)} action>{circle.name}</ListGroupItem>
                                )
                        } else {
                                return (
                                    <ListGroupItem key={circle._id} disabled>
                                        <Row>
                                            <Col xs={8}>{circle.name}</Col>
                                            <Col xs={4}><FontAwesomeIcon icon={faCheck} size="1x"/></Col>
                                        </Row>
                                    </ListGroupItem>
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
