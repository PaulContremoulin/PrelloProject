// Modules
import React from 'react';
import {Container, Row, Col, Card, CardBody, CardText, CardTitle, Button} from 'reactstrap';
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import {history} from "../../history";

// Css...
import './Account.css';
import {resetPswd} from "../../requests/resetPswd";
import {logOut} from "../../actions/signActions";
import {ChangePassword} from "./ChangePassword/ChangePassword";

// Actions & Constant

export class AccountToBeConnected extends React.Component {

    changePassword = (email) => {
        resetPswd(email,process.env.REACT_APP_FRONT_URL)
            .then(res => {
                if (res.status === 202) {
                    //this.props.logOut();
                    //history.push('/login');
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

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
                        <Col xs={12} sm={4}>
                            <Card>
                                <CardBody>
                                    <CardText>
                                        <Row>
                                            <Col sm={2}>
                                                <FontAwesomeIcon icon={faUser} size="2x"/>
                                            </Col>
                                            <Col sm={10}>
                                                {this.props.user.member.firstName+' '+this.props.user.member.lastName}
                                            </Col>
                                        </Row>
                                        <Row className="indexCol">
                                            <Col sm={2}>
                                                <FontAwesomeIcon icon={faBriefcase} size="2x"/>
                                            </Col>
                                            <Col sm={10}>
                                                {this.props.user.member.organization}
                                            </Col>
                                        </Row>
                                        <Row className="indexCol">
                                            <Col sm={2}>
                                                <FontAwesomeIcon icon={faEnvelope} size="2x"/>
                                            </Col>
                                            <Col sm={10}>
                                                {this.props.user.member.email}
                                            </Col>
                                        </Row>
                                    </CardText>
                                    <ChangePassword/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} sm={5}>
                            <Card>
                                <CardBody>
                                    <CardText>{this.props.user.member.bio}</CardText>
                                <Button>Change Description</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} sm={3}>
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

