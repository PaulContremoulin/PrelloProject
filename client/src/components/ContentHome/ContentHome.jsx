// Modules
import React from 'react';
import {Container, Row, Col, Alert} from 'reactstrap';

// Css...
import './ContentHome.css';

// Actions & Constant
import {CreateBoard} from "../CreateBoard/CreateBoard";
import {connect} from "react-redux";

export class ContentHomeToBeConnected extends React.Component {

    render() {
        console.log(this.props.boards.length);
        return (
            <div>
                <Container className="contentHome">
                    <Row>
                        <Col>
                            <h2>Personnal's Boards</h2>
                        </Col>
                    </Row>
                </Container>
                <Container className="contentBoard">
                    <Row>
                        <Col>
                            {(this.props.boards.length === 0) ?
                                <Alert color="secondary">
                                    You haven't board ! Click on the button, to add a new board
                                </Alert>
                                :
                                <Alert color="secondary">
                                    You have board
                                </Alert>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CreateBoard/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = ( state, props ) => ({
    user : state.user,
    boards: state.boards,
});

const mapDispatchToProps = ( dispatch ) => ({});

export const ContentHome = connect(
    mapStateToProps,
    mapDispatchToProps,
)( ContentHomeToBeConnected );