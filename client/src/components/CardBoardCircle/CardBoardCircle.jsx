// Modules
import React from 'react';
import {Card, CardHeader, Button, CardBody, CardText, Col, Row, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';

// Css...

// Actions & Constant
import {deleteBoardCircle} from "../../requests/circle";
import {deleteBoardsCircle} from "../../actions/circleActions";
import {connect} from "react-redux";

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
        //this.props.deleteBoardsCircle(boardId);
        this.toggle();
        deleteBoardCircle(circleId, boardId)
            .then(res => {
                if (res.status === 200) {
                    alert("delete");
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log("error");
            })

    };

    render() {
        return (
            <div>
                <Card style={{ backgroundColor: this.props.board.color}}>
                    <CardHeader>
                        <Row>
                            <Col xs={9}>
                                {this.props.board.name}
                            </Col>
                            <Col xs={1}>
                                <Button onClick={this.toggle} close />
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <CardText>{this.props.board.desc}</CardText>
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
});

const mapDispatchToProps = ( dispatch ) => ({
    deleteBoardsCircle: (res) => dispatch(deleteBoardsCircle(res)),
});

export const CardBoardCircle = connect(
    mapStateToProps,
    mapDispatchToProps,
)( CardBoardCircleToBeConnected );