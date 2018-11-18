import React from 'react';
import { connect } from 'react-redux';

// Components & Actions
import {Account} from '../../components/Account/Account'

// Css


export const AccountPageToBeConnected = () => (
    <div className="AccountPage">
        <Account/>
    </div>
)

const mapStateToProps = ( state, props ) => ({})

const mapDispatchToProps = ( dispatch ) => ({})

export const AccountPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)( AccountPageToBeConnected );
