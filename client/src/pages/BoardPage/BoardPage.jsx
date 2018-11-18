import React from 'react';
import { connect } from 'react-redux';

// Components & Actions
import {Board} from '../../components/Board/Board';
import { logOut } from '../../actions/signActions.js';

// Css

export const BoardPageToBeConnected = ({}) => (
    <div className="BoardPage">
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
