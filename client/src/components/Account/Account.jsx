// Modules
import React from 'react';
import {connect} from "react-redux";
import {Container, Row, Col, Card, CardBody, CardText} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faBriefcase } from '@fortawesome/free-solid-svg-icons';

// Css
import './Account.css';

// Actions & Constant
import {ChangePassword} from "./ChangePassword/ChangePassword";
import {DeleteAccount} from "./DeleteAccount/DeleteAccount";
import {ChangeInformation} from "./ChangeInformation/ChangeInformation";
import {getAllBoardsUser} from "../../requests/boards";

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
                        <Col xs={12} sm={5} md={4} lg={{size:3, offset:1}} xl={{size:3, offset:1}}>
                            <Card>
                                <CardBody>
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
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} sm={7} md={4} lg={6} xl={6}>
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
                        <Col xs={12} sm={12} md={{size:2, offset:2}} lg={{size:1, offset:1}} xl={{size:1, offset:1}}>
                            <ChangeInformation/>
                            <ChangePassword/>
                            <DeleteAccount/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4} md={4} lg={{size:3, offset:1}} xl={{size:3, offset:1}}>
                            <Card className="indexCol">
                                <CardBody className="bodyStatMyProfile">
                                        <Col className="centerCol">
                                            Number of personal boards
                                        </Col>
                                        <Col className="centerCol">
                                            {this.state.nbrBoardsPersonal}
                                        </Col>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} sm={4} md={4} lg={{size:3}} xl={{size:3}}>
                            <Card className="indexCol">
                                <CardBody className="bodyStatMyProfile">
                                        <Col className="centerCol">
                                            Number of shared boards
                                        </Col>
                                        <Col className="centerCol">
                                            {this.state.nbrBoardsShare}
                                        </Col>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} sm={4} md={4} lg={{size:3}} xl={{size:3}}>
                            <Card className="indexCol">
                                <CardBody className="bodyStatMyProfile">
                                        <Col className="centerCol">
                                            Number of circles
                                        </Col>
                                            <Col className="centerCol">
                                            {this.props.circles.length}
                                        </Col>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    componentDidMount() {
        getAllBoardsUser(this.props.user.member._id)
            .then(res => {
                const boardsPersonal = res.data.filter(board => board.memberships.length === 1);
                const boardsShare = res.data.filter(board => board.memberships.length > 1);
                this.setState({
                    nbrBoardsPersonal: boardsPersonal.length,
                    nbrBoardsShare: boardsShare.length,
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

}

const mapStateToProps = ( state, props ) => ({
    user : state.user,
    circles: state.circles,
    boards: state.boards,
});

const mapDispatchToProps = ( dispatch ) => ({});

export const Account = connect(
    mapStateToProps,
    mapDispatchToProps,
)( AccountToBeConnected );

