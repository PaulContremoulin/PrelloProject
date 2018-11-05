// Modules
import React from 'react';
import { connect } from 'react-redux';
import {history} from '../../history';
import {logOut} from "../../actions/signActions";

// Css...
import './NavBar.css';
import {Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';

// Actions & Constant

export class NavBarToBeConnected extends React.Component {

    logOut = () => {
        this.props.logOut();
        history.push('/');
    };

    render() {
        const {
          user,
          changeMode,
            changepswd
        } = this.props;
        return (
            <Navbar expand="md">
                {
                    !(user.member) ? <NavbarBrand href="/">Prello</NavbarBrand> : <NavbarBrand href="/home">Prello</NavbarBrand>
                }
                {!(user.member) && !(changepswd==="true") &&
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="signUp" href="#" onClick={ () => changeMode(true) }>Sign Up</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="signIn" href="#" onClick={ () => changeMode(false) } >Sign In</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                }
                {(user.member) && !(changepswd==="true") &&
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="helpNavItem" href="#" >My account</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="helpNavItem" href="/" onClick={ () => logOut() } >Log out</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                }
            </Navbar>
        )
    }
}

const mapStateToProps = (state, props) => ({
  user: state.user
});
const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch( logOut()),
});

export const NavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)( NavBarToBeConnected )
