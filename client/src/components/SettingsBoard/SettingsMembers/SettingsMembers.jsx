// Modules
import React from 'react';
import {Row, Button, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {AddMembers} from "../AddMembers/AddMembers";
import {ModifyRoleMember} from "./ModifyRoleMember/ModifyRoleMember";
import {DeleteMember} from "./DeleteMember/DeleteMember";

// Css...
import './SettingsMembers.css';
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import {history} from "../../../history";
import {ShowProfileMember} from "./ShowProfileMember/ShowProfileMember";

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
                    </Col>
                </Row>
                <Row>
                    <Col className="listGroupMember" sm={{size:6, offset:3}}>
                        <ListGroup>
                            {this.props.board.memberships.map(membership => {
                                console.log(membership);
                                return (
                                    <ListGroupItem>
                                            <Row>
                                            <Col xs={5} sm={3} md={5} className="float-left">
                                                <ShowProfileMember usernameMember={membership.idMember.username} idMember={membership.idMember._id}/>
                                            </Col>
                                            <Col xs={3} sm={5} md={3}>
                                                {membership.memberType}
                                            </Col>
                                                {(membership.idMember._id === this.props.user.member.id) && (this.props.nbrMember > 1) && (this.props.type === "admin") &&
                                                <Col xs={2} sm={2} md={2}>
                                                    <ModifyRoleMember type="user" member={membership}/>
                                                </Col>
                                                }
                                                {(membership.idMember._id !== this.props.user.member.id) && this.props.type === "admin" &&
                                                <Col xs={2} sm={2} md={2}>
                                                    <ModifyRoleMember type="other" member={membership}/>
                                                </Col>
                                                }
                                                {membership.idMember._id !== this.props.user.member.id && this.props.type === "admin" &&
                                                <Col xs={2} sm={2} md={2}>
                                                    <DeleteMember/>
                                                </Col>
                                                }
                                            </Row>
                                        </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                        {this.props.type !== "observer" &&
                        < AddMembers />
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    board: state.board,
    user: state.user,
});
const mapDispatchToProps = (dispatch) => ({});

export const SettingsMembers = connect(
    mapStateToProps,
    mapDispatchToProps
)( SettingsMembersToBeConnected )