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
            <Container className="contentHome">
                <Row>
                    <Col>
                        <CreateBoard/>
                    </Col>
                </Row>
                <Row>
                    Display Board
                </Row>
            </Container>
        )
    }
}


