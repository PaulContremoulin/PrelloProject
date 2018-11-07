// Modules
import React from 'react';
import {Container, Row, Col, Alert} from 'reactstrap';

// Css...

// Actions & Constant
import {connect} from "react-redux";

export class ContentCircleToBeConnected extends React.Component {
    render() {
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
                        <h1>ok</h1>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = ( state, props ) => ({
    user : state.user,
    circle: state.circle,
});

const mapDispatchToProps = ( dispatch ) => ({});

export const ContentCircle = connect(
    mapStateToProps,
    mapDispatchToProps,
)( ContentCircleToBeConnected );