// Modules
import React from 'react';
import './NavBar.css';

import {Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';

// Css...

// Actions & Constant

export class NavBar extends React.Component {

    logOut = () => {
        //todo : appeler action log out & redirection page sign in
    };

    render() {
        const { changeMode, incomingFrom, logOut } = this.props;
        return (
            <Navbar expand="md">
                {(incomingFrom == "LoginPage") ?
                    <NavbarBrand href="/">Prello</NavbarBrand>
                    :
                    <NavbarBrand href="/home">Prello</NavbarBrand>
                }
                { (incomingFrom == "LoginPage") ?
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="helpNavItem" href="#" onClick={ () => changeMode(true) }>Sign Up</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="helpNavItem" href="#" onClick={ () => changeMode(false) } >Sign In</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                :
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="helpNavItem" href="/account" >My account</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="helpNavItem" href="#" onClick={ () => logOut() } >Log out</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                }
            </Navbar>
        )
    }
}
