// Modules
import React from 'react';
import {Container, Row, Col, Alert} from 'reactstrap';

// Css...
import './ContentHome.css';

// Actions & Constant
import {CreateBoard} from "../CreateBoard/CreateBoard";
import {connect} from "react-redux";
import {CardBoard} from "../CardBoard/CardBoard";

export class ContentHomeToBeConnected extends React.Component {

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
                        <Col>
                            {this.props.boards.map(board => {
                                    return(
                                        <CardBoard board={board}/>
                                    )
                                })}
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