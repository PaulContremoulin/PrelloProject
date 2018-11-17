// Modules
import React from 'react';
import { connect } from 'react-redux';
import {history} from "../../../history";

// Css...
import './BoardMenu.css';
import {Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/fontawesome-free-regular';
import {faSlidersH, faTags} from '@fortawesome/fontawesome-free-solid';

// Actions & Constant

export class BoardMenu extends React.Component {
  constructor(props) {
      super(props);
  }

  redirectionSettings = (boardId, boardName) => {
      history.push('/board/'+boardId+'/'+boardName+'/settings');
  }

  render() {
    const {boardName, boardId, color} = this.props;

    return (
      <div className="BoardMenu">
        <Navbar className="boardNavBar" style={{'border-bottom':'solid 5px '+color}} expand="md">
          <NavbarBrand className="boardTitle" disabled href="#">Board - {boardName}</NavbarBrand>
          <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink className="boardMenu"><FontAwesomeIcon color="white" style={{"margin-right":"8px"}} icon={faTags}/></NavLink>
              </NavItem>
              <NavItem>
                  <NavLink className="boardMenu" href="#" onClick={() => this.redirectionSettings(boardId, boardName)}><FontAwesomeIcon size="lg" color="white" style={{"margin-right":"8px"}} icon={faSlidersH}/></NavLink>
              </NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}
