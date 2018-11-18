// Modules
import React from 'react';
import {history} from "../../../history";
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSlidersH} from '@fortawesome/fontawesome-free-solid';

// Css...
import './BoardMenu.css';

// Actions & Constant
import {TagsList} from "./TagsList/TagsList";

export class BoardMenu extends React.Component {
  constructor(props) {
      super(props);
  }

  redirectionSettings = (boardId, boardName) => {
      history.push('/board/'+boardId+'/'+boardName+'/settings');
  }

  render() {
    const {boardName, boardId, color, boardLabels, addLabel, deleteLabelFromBoard} = this.props;

    return (
      <div className="BoardMenu">
        <Navbar className="boardNavBar" style={{'border-bottom':'solid 5px '+color}} expand="md">
          <NavbarBrand className="boardTitle" disabled href="#">Board - {boardName}</NavbarBrand>
          <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink className="boardMenu" href="#">
                      <TagsList
                          boardId={boardId}
                          boardLabels={boardLabels}
                          addLabel={addLabel}
                          deleteLabelFromBoard={deleteLabelFromBoard}
                      />
                  </NavLink>
              </NavItem>
              <NavItem>
                  <NavLink className="boardMenu" href="#" onClick={() => this.redirectionSettings(boardId, boardName)}><FontAwesomeIcon size="lg"    style={{"margin-right":"8px"}} icon={faSlidersH}/></NavLink>
              </NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}
