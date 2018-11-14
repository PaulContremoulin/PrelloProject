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
import {ChangeInformation} from "./ChangeInformation/ChangeInformation";

// Actions & Constant

export class AccountToBeConnected extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'nbrBoardsPersonal':[],
            'nbrBoardsShare':[],
        }
    }

    render() {
        return (
            <div>
                <Container className="contentHome">
                    <Row>
                        <Col className="TitleMyAccount" align="center">
                            <h2>My Profile</h2>
                        </Col>
                    </Row>
                    <Row className="contentMyAccount">
                        <Col xs={12} sm={12} md={{size:3, offset:1}}>
                            <Card>
                                <CardBody>
                                    <CardText>
                                        <Row>
                                            <Col sm={2}>
                                                <FontAwesomeIcon icon={faUser} size="1x"/>
                                            </Col>
                                            <Col sm={10}>
                                                <div>
                                                {this.props.user.member.firstName+' '+this.props.user.member.lastName}
                                                </div>
                                                <div>
                                                {'@'+this.props.user.member.username}
                                                </div>
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
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <Card className="cardBio">
                                <CardBody>
                                    {this.props.user.member.bio === undefined || this.props.user.member.bio === "" ?
                                        <CardText>Neither Description</CardText>
                                        :
                                        <CardText>{this.props.user.member.bio}</CardText>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} sm={12} md={2}>
                            <ChangeInformation/>
                            <ChangePassword/>
                            <DeleteAccount/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={{size:3, offset:1}}>
                            <Card className="indexCol">
                                <CardBody className="bodyStatMyProfile">
                                    <CardText>
                                        <Col className="centerCol">
                                            Number of personal boards
                                        </Col>
                                        <Col className="centerCol">
                                            {this.state.nbrBoardsPersonal}
                                        </Col>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} sm={12} md={3}>
                            <Card className="indexCol">
                                <CardBody className="bodyStatMyProfile">
                                    <CardText>
                                        <Col className="centerCol">
                                            Number of shared boards
                                        </Col>
                                        <Col className="centerCol">
                                            {this.state.nbrBoardsShare}
                                        </Col>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} sm={12} md={3}>
                            <Card className="indexCol">
                                <CardBody className="bodyStatMyProfile">
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

    componentDidMount() {
        const boardsPersonal = this.props.boards.filter(board => board.memberships.length === 1);
        const boardsShare = this.props.boards.filter(board => board.memberships.length > 1);
        this.setState({
            nbrBoardsPersonal: boardsPersonal.length,
            nbrBoardsShare: boardsShare.length,
        })
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

