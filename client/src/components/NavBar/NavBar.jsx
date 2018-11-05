// Modules
import React from 'react';
import { connect } from 'react-redux';
import {history} from '../../history';
import {logOut} from "../../actions/signActions";

// Css...
import logo from '../../assets/prello_logo.png';
import './NavBar.css';
import {Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';

// Actions & Constant

export class NavBarToBeConnected extends React.Component {

    logOut = () => {
        this.props.logOut();
        history.push('/');
    };

    redirectionMain = () => {
        history.push('/')
    };

    redirectionHome = () => {
        history.push('/home')
    };

    redirectionLogin = () => {
        history.push('/login')
    };

    redirectionRegistration = () => {
        history.push('/registration')
    };

    render() {
        const {
            user,
            changepswd
        } = this.props;
        return (
            <Navbar expand="md">
                {!(user.member) ?
                    <NavbarBrand><a href="#" onClick={() => this.redirectionMain()}><img src={logo} style={{width:100, marginTop: -5}} /></a></NavbarBrand>
                    :
                    <NavbarBrand><a href="#" onClick={() => this.redirectionHome()}><img src={logo} style={{width:100, marginTop: -5}} /></a></NavbarBrand>
                }
                {!(user.member) && !(changepswd==="true") &&
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="helpNavItem" href="#" onClick={ () => this.redirectionRegistration() }>Sign Up</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="helpNavItem" href="#" onClick={ () => this.redirectionLogin() } >Sign In</NavLink>
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
                            <NavLink className="helpNavItem" href="#" onClick={ () => this.logOut() } >Log out</NavLink>
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