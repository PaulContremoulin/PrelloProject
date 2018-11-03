// Modules
import React from 'react';
import {Container, Row, Col, Alert} from 'reactstrap';

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
                        <Col>
                            <Alert color="secondary">
                                You haven't board ! Click on the button, to add a new board
                            </Alert>
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


