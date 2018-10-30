// Modules
import React from 'react';
import { connect } from 'react-redux';
import './MenuHome.css';
import { Button, Col, Row } from 'reactstrap';


// Css...

// Actions & Constant

export const MenuHomeToBeConnected = ({ circles, teams }) => (
    <div className="vertical-menu">
      <h3>Boards<Button color="primary">+</Button></h3>
      <a href="#">Personnal Boards</a>
      <h3>Circles<Button color="primary">+</Button></h3>
      {
        // circles.map(( circle ) => <a href="#">circle.circleName</a> )
        // .reduce(( childArray, child ) => childArray.concat( child ), [])
      }
      <h3>Team<Button color="primary">+</Button></h3>
      {
        // teams.map(( team ) => <a href="#">team.teamName</a> )
        // .reduce(( childArray, child ) => childArray.concat( child ), [])
      }
    </div>
)

const mapStateToProps = ( state, props ) => ({
  circles: state.circles,
  teams: state.teams
})

const mapDispatchToProps = ( dispatch ) => ({})

export const MenuHome = connect(
  mapStateToProps,
  mapDispatchToProps,
)( MenuHomeToBeConnected );
