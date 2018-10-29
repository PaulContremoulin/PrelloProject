import React from 'react';
import {NavBar} from '../../components/SignInOrSignUp/NavBar/NavBar'
import {MenuHome} from '../../components/MenuHome/MenuHome';
import {ContentHome} from '../../components/ContentHome/ContentHome';
import './HomePage.css';
import { Container, Row, Col } from 'reactstrap';

export const HomePage = () => (
    <div className="LoginPage">
        <NavBar/>
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

export default HomePage;
