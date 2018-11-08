import React from 'react';
import { connect } from 'react-redux';

// Components & Actions
import {NavBar} from '../../components/NavBar/NavBar'
import {Account} from '../../components/Account/Account'
import { logOut } from '../../actions/signActions.js';

// Css


export const AccountPageToBeConnected = ({ logOut }) => (
    <div className="AccountPage">
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
