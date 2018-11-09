// Modules
import React from 'react';
import {Row, Button, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {AddMembers} from "../AddMembers/AddMembers";

// Css...
import './SettingsMembers.css';
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

// Actions & Constant

export class SettingsMembersToBeConnected extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="SettingsMembers">
                <Row>
                    <Col sm={{size:8, offset:2}}>
                        <h4 className="float-left"><FontAwesomeIcon icon={faUsers} size="1x"/> Members</h4>
                        <AddMembers/>
                    </Col>
                </Row>
                <Row>
                    <Col className="listGroupMember" sm={{size:6, offset:3}}>
                        <ListGroup>
                            {this.props.board.memberships.map(membership => {
                                console.log(membership);
                                return (
                                    <ListGroupItem>
                                        <div className="float-left">
                                            {membership.idMember}
                                        </div>
                                        <div className="float-right">
                                            {membership.memberType}
                                        </div>
                                        </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    board: state.board,
});
const mapDispatchToProps = (dispatch) => ({});

export const SettingsMembers = connect(
    mapStateToProps,
    mapDispatchToProps
)( SettingsMembersToBeConnected )