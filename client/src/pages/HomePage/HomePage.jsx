import React from 'react';
import {NavBar} from '../../components/NavBar/NavBar'
import {MenuHome} from '../../components/MenuHome/MenuHome';
import {ContentHome} from '../../components/ContentHome/ContentHome';
import './HomePage.css';
import { Container, Row, Col } from 'reactstrap';

export const HomePage = () => (
    <div className="HomePage">
        <NavBar incomingFrom="HomePage" />
            <Row>
                <Col md="3">
                    <MenuHome/>
                </Col>
                <Col md="9">
                    <ContentHome/>
                </Col>
            </Row>
    </div>
)

// TODO : Store in home page what content to show in ContentHome. I.e "personnal boards".

export default HomePage;
