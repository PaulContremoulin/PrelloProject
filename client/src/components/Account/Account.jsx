// Modules
import React from 'react';
import {Container, Row, Col, Card, CardBody, CardText, CardTitle, Button} from 'reactstrap';
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import {history} from "../../history";

// Css...
import './Account.css';
import {logOut} from "../../actions/signActions";
import {ChangePassword} from "./ChangePassword/ChangePassword";
import {DeleteAccount} from "./DeleteAccount/DeleteAccount";

// Actions & Constant

export class AccountToBeConnected extends React.Component {

    render() {
        return (
            <div>
                <Container className="contentHome">
                    <Row>
                        <Col align="center">
                            <h2>{this.props.user.member.username}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={4}>
                            <Card>
                                <CardBody>
                                    <CardText>
                                        <Row>
                                            <Col sm={2}>
                                                <FontAwesomeIcon icon={faUser} size="1x"/>
                                            </Col>
                                            <Col sm={10}>
                                                {this.props.user.member.firstName+' '+this.props.user.member.lastName}
                                            </Col>
                                        </Row>
                                        <Row className="indexCol">
                                            <Col sm={2}>
                                                <FontAwesomeIcon icon={faBriefcase} size="1x"/>
                                            </Col>
                                            <Col sm={10}>
                                                {this.props.user.member.organization}
                                            </Col>
                                        </Row>
                                        <Row className="indexCol">
                                            <Col sm={2}>
                                                <FontAwesomeIcon icon={faEnvelope} size="1x"/>
                                            </Col>
                                            <Col sm={10}>
                                                {this.props.user.member.email}
                                            </Col>
                                        </Row>
                                    </CardText>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} xl={6}>
                                            <ChangePassword/>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} xl={6}>
                                            <DeleteAccount/>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} sm={12} md={5}>
                            <Card>
                                <CardBody>
                                    {this.props.user.member.bio === undefined ?
                                        <CardText>Neither Description</CardText>
                                        :
                                        <CardText>{this.props.user.member.bio}</CardText>
                                    }
                                <Button>Change Description</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} sm={12} md={3}>
                            <Card>
                                <CardBody>
                                    <CardText>
                                        <Col className="centerCol">
                                            Number of boards
                                        </Col>
                                        <Col className="centerCol">
                                            {this.props.boards.length}
                                        </Col>
                                        </CardText>
                                </CardBody>
                            </Card>
                            <Card className="indexCol">
                                <CardBody>
                                    <CardText>
                                        <Col className="centerCol">
                                            Number of circles
                                        </Col>
                                        <Col className="centerCol">
                                            {this.props.circles.length}
                                        </Col>
                                        </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = ( state, props ) => ({
    user : state.user,
    circles: state.circles,
    boards: state.boards,
});

const mapDispatchToProps = ( dispatch ) => ({
    logOut: () => dispatch( logOut()),
});

export const Account = connect(
    mapStateToProps,
    mapDispatchToProps,
)( AccountToBeConnected );

