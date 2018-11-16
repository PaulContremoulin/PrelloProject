import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';

// Css
import './HomePage.css';

// Components & Actions
import {MenuHome} from '../../components/MenuHome/MenuHome';
import {ContentHome} from '../../components/ContentHome/ContentHome';
import { logOut } from '../../actions/signActions.js';

export const HomePageToBeConnected = () => (
    <div className="home">
            <Col className="menu" xs={6} sm={5} md={3} xl={2}>
                <MenuHome/>
            </Col>
            <Col xs={6} sm={7} md={9} xl={10}>
                <ContentHome/>
            </Col>
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
