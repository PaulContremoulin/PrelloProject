import React from 'react';
import { connect } from 'react-redux';

// Components & Actions
import {NavBar} from '../../components/NavBar/NavBar';
import {Board} from '../../components/Board/Board';
import { logOut } from '../../actions/signActions.js';

// Css

export const BoardPageToBeConnected = ({}) => (
    <div className="BoardPage">
      <NavBar incomingFrom="BoardPage" logOut={ logOut } />
      <Board style={{"height": "100%"}} />
    </div>
)


const mapStateToProps = ( state, props ) => ({})

const mapDispatchToProps = ( dispatch ) => ({
  logOut: () => dispatch( logOut() ),
})

export const BoardPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)( BoardPageToBeConnected );
