// Modules
import React from 'react';
import {history} from '../../history';
import {Button, Container, Col, Row} from 'reactstrap';

// Css...
import './MainPage.css';

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
                <Container>
                    <Row>
                        <Col className="contentRight" xs={5} sm={6}>
                            <h1 className="content">Prello is a collaboration tool that organizes your projects into boards.</h1>
                        </Col>
                        <Col className="contentLeft" xs={7} sm={{size:5, offset:1}}>
                            <Col>
                                <h1 className="content"> Ready ?</h1>
                                <Button className="butCreateAccount" onClick={() => this.redirectionRegistration()}>Create your account</Button>
                            </Col>
                            <Col>
                                <Button className="buttonLog" onClick={() => this.redirectionLogin()}>Log In</Button>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
};