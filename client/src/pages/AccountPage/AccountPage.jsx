import React from 'react';
import { connect } from 'react-redux';

// Components & Actions
import {NavBar} from '../../components/NavBar/NavBar'
import {Account} from '../../components/Account/Account'
import { logOut } from '../../actions/signActions.js';

// Css
import { Container, Row, Col } from 'reactstrap';

export const AccountPageToBeConnected = ({ logOut }) => (
    <div className="AccountPage">
        <NavBar incomingFrom="HomePage" logOut={ logOut } />
        <Container>
            <Row>
                <Col align="center">
                    <h1>My account</h1>
                </Col>
            </Row>
        </Container>
        <Account/>
    </div>
)

// TODO : Store in home page what content to show in ContentHome. I.e "personnal boards".


const mapStateToProps = ( state, props ) => ({})

const mapDispatchToProps = ( dispatch ) => ({
    logOut: () => dispatch( logOut() ),
})

export const AccountPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)( AccountPageToBeConnected );
