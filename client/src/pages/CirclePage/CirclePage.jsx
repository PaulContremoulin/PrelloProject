// Modules
import React from 'react';
import {NavBar} from "../../components/NavBar/NavBar";
import {MenuHome} from "../../components/MenuHome/MenuHome";

// Css...
import {Row, Col} from 'reactstrap';
import {ContentCircle} from "../../components/ContentCircle/ContentCircle";

// Actions & Constant

export class CirclePage extends React.Component {

    render() {
        return (
            <div className="CirclePage">
                <NavBar/>
                <Row>
                    <Col className="menu" xs={5} sm={3}>
                        <MenuHome/>
                    </Col>
                    <Col xs={7} sm={8}>
                        <ContentCircle/>
                    </Col>
                </Row>
            </div>
        )
    }
}