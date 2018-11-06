// Modules
import React from 'react';
import {history} from '../../history';

// Css...
import './MainPage.css';
import {NavBar} from "../../components/NavBar/NavBar";
import {Button, Container, Col, Row} from 'reactstrap';

// Actions & Constant

export class MainPage extends React.Component {

    redirectionLogin = () => {
        history.push('/login')
    };

    redirectionRegistration = () => {
        history.push('/registration')
    };

    render() {
        return (
            <div className="MainPage">
                <NavBar/>
                <Container>
                    <Row>
                        <Col className="contentRight" xs={12} sm={6}>
                            <h1 className="title">Prello is a collaboration tool that organizes your projects into boards.</h1>
                        </Col>
                        <Col className="contentLeft" xs={12} sm={{size:5, offset:1}}>
                            <h1 className="title"> Ready ?</h1>
                            <Button onClick={() => this.redirectionRegistration()}>Create your account</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
};