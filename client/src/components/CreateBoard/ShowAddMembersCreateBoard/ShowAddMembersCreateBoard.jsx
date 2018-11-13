// Modules
import React from 'react';
import {ListGroupItem, ListGroup, Row, Col, Alert} from 'reactstrap';
import {connect} from "react-redux";

// Css...
import './ShowAddMembersCreateBoard.css';

// Actions & Constant
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {deleteMemberCreationBoard} from "../../../actions/membersActions";

export class ShowAddMembersCreateBoardToBeConnected extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteMemberCreation = (member) => {
        this.props.deleteMemberCreationBoard(member);
    }


    render() {
        return (
            <div className="ShowAddMembersCreateBoard">
                {this.props.members.length !== 0 ?
                    <ListGroup className="listGroupAddMember">
                        {this.props.members.map(member => {
                            return (
                                <ListGroupItem>
                                    <Row>
                                        <Col xs={10}>
                                            {member.username}
                                        </Col>
                                        <Col xs={2}>
                                            <FontAwesomeIcon onClick={() => this.deleteMemberCreation(member)}
                                                             icon={faTimes} size="1x"/>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )
                        })
                        }
                    </ListGroup>
                    :
                    <Alert className="alertNeitherMember" color="secondary">
                        Neither member
                    </Alert>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    members: state.members,
});
const mapDispatchToProps = (dispatch) => ({
    deleteMemberCreationBoard: (res) => dispatch( deleteMemberCreationBoard(res)),
});

export const ShowAddMembersCreateBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)( ShowAddMembersCreateBoardToBeConnected )