import React from 'react';
import { connect } from 'react-redux';

// Components & Actions
import {NavBar} from '../../components/NavBar/NavBar'
import {MenuHome} from '../../components/MenuHome/MenuHome';
import {ContentHome} from '../../components/ContentHome/ContentHome';
import { logOut } from '../../actions/signActions.js';

// Css
import './HomePage.css';
import { Row, Col } from 'reactstrap';

export const HomePageToBeConnected = ({ logOut }) => (
    <div>
        <NavBar incomingFrom="HomePage" logOut={ logOut } />
            <Row>
                <Col className="menu" xs={5} sm={3}>
                    <MenuHome/>
                </Col>
                <Col xs={7} sm={8}>
                    <ContentHome/>
                </Col>
            </Row>
    </div>
)


const mapStateToProps = ( state, props ) => ({})

const mapDispatchToProps = ( dispatch ) => ({
  logOut: () => dispatch( logOut() ),
})

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)( HomePageToBeConnected );
