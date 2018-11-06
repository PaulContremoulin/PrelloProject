// Modules
import React from 'react';
import { connect } from 'react-redux';
import './MenuHome.css';
import { Row, Col } from 'reactstrap';


// Css...

// Actions & Constant
import {AddCircle} from "../AddCircle/AddCircle";
import { addCircle } from "../../actions/circleActions";
import { addCircleToDB } from "../../requests/circle";
import {AddTeam} from "../AddTeam/AddTeam";
import { addTeam } from "../../actions/teamActions";
import { addTeamToDB } from "../../requests/team";

export const MenuHomeToBeConnected = ({ user, circles, teams, addCircle, addTeam }) => (
    <div className="vertical-menu">
        <Row>
            <Col>
              <h3 className="title">Boards</h3>
              <a href="#">Personnal's Boards</a>
              <h3 className="title">Circles
                <AddCircle
                  addCircle={ (circleId, circleName) => addCircle(circleId, circleName) }
                  addCircleToDB={ (circleName) => addCircleToDB( user.userId , circleName ) }
                />
              </h3>
              {
                // circles.map(( circle ) => <a href="#">circle.circleName</a> )
                // .reduce(( childArray, child ) => childArray.concat( child ), [])
              }
              <h3 className="title">Teams
                <AddTeam
                  addTeam={ (teamId, teamName) => addTeam(teamId, teamName) }
                  addTeamToDB={ (teamName) => addTeamToDB( user.userId , teamName ) }
                />
              </h3>
              {
                // teams.map(( team ) => <a href="#">team.teamName</a> )
                // .reduce(( childArray, child ) => childArray.concat( child ), [])
              }
            </Col>
        </Row>
    </div>
)

const mapStateToProps = ( state, props ) => ({
  user: state.user,
  circles: state.circles,
  teams: state.teams,
})

const mapDispatchToProps = ( dispatch ) => ({
  addCircle: ( circleId, circleName ) => dispatch( addCircle( circleId, circleName )),
  addTeam: ( teamId, teamName ) => dispatch( addTeam( teamId, teamName )),
})

export const MenuHome = connect(
  mapStateToProps,
  mapDispatchToProps,
)( MenuHomeToBeConnected );
