// Modules
import React from 'react';
import './NavBar.css';

import {Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

// Css...

// Actions & Constant

export class NavBar extends React.Component {
    render() {
        return (
            <Navbar expand="md">
                <NavbarBrand href="/">Prello</NavbarBrand>
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="helpNavItem" href="/components/">Sign Up</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="helpNavItem" href="">Sign In</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}
