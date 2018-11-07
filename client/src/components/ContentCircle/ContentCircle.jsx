// Modules
import React from 'react';
import {Container, Row, Col, Alert} from 'reactstrap';

// Css...

// Actions & Constant
import {connect} from "react-redux";
import {CardBoard} from "../CardBoard/CardBoard";

export class ContentCircleToBeConnected extends React.Component {
    render() {
        return (
            <div>
                <Container className="contentHome">
                    <Row>
                        <Col>
                            <h2>{this.props.circle.name}</h2>
                        </Col>
                    </Row>
                </Container>
                <Container className="contentBoard">
                    <Row>
                        {this.props.circle.idBoards.map(board => {
                            return(
                                <Col className="displayBoard" xs={12} sm={6} md={3}>
                                    <CardBoard board={board} key={ board._id }/>
                                </Col>
                            )
                        })}
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