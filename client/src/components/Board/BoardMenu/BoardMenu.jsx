// Modules
import React from 'react';
import { connect } from 'react-redux';

// Css...
import './BoardMenu.css';
import {Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';
import Octicon from 'react-octicon';

// Actions & Constant

export class BoardMenu extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    const boardName = this.props.boardName;
    return (
      <div className="BoardMenu">
        <Navbar className="boardNavBar" expand="md">
          <NavbarBrand className="boardTitle" disabled href="#">{boardName}</NavbarBrand>
          <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink className="boardMenu" disabled href="#" ><Octicon name="gear"/></NavLink>
              </NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}
