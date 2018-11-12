// Modules
import React from 'react';
import {Card, CardHeader, Button, CardBody, CardText, Col, Row, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';

// Css...
import './CardBoardCircle.css';

// Actions & Constant
import {deleteBoardCircle, getCirclesUser} from "../../requests/circle";
import {deleteBoardsCircle, fetchCircles} from "../../actions/circleActions";
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faUsers} from "@fortawesome/free-solid-svg-icons/index";

export class CardBoardCircleToBeConnected extends React.Component {
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

    deleteBoard = (circleId, boardId) => {
        deleteBoardCircle(circleId, boardId)
            .then(res => {
                if (res.status === 200) {
                    this.props.deleteBoardsCircle(boardId);
                    getCirclesUser(this.props.user.member._id)
                        .then(res => {
                            this.props.fetchCircles(res.data)
                        })
                        .catch(error => {
                            console.log(error)
                        });
                    this.toggle();
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log("error");
            })

    };

    render() {
        const {goToPageBoard, board } = this.props;
        return (
            <div>
                <Card style={{ borderBottomColor: board.prefs.background, borderBottomWidth: 4}}>
                    <CardHeader className="headerBoardCard">
                        <div className="butHeaderCard">
                            {this.props.board.name}
                            <Button className="float-right" onClick={this.toggle} close />
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
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>Do you want remove this board from the circle ? </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="danger" onClick={() => this.deleteBoard(this.props.circle._id, this.props.board._id)}>Delete</Button>
                    </ModalFooter>
                </Modal>
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
    deleteBoardsCircle: (res) => dispatch(deleteBoardsCircle(res)),
    fetchCircles: (res) => dispatch( fetchCircles(res)),
});

export const CardBoardCircle = connect(
    mapStateToProps,
    mapDispatchToProps,
)( CardBoardCircleToBeConnected );
