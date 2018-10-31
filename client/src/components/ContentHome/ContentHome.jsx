// Modules
import React from 'react';
import {Container, Row, Col} from 'reactstrap';

// Css...
import './ContentHome.css';

// Actions & Constant
import {CreateBoard} from "../CreateBoard/CreateBoard";

export class ContentHome extends React.Component {

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
                        <Col className="displayBoard" md="2">
                            Display Board
                        </Col>
                        <Col className="displayBoard" md="2">
                            Display Board
                        </Col>
                        <Col className="displayBoard" md="2">
                            Display Board
                        </Col>
                        <Col md="2">
                            <CreateBoard/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


