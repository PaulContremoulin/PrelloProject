// Modules
import React from 'react';
import { connect } from 'react-redux';
import {history} from '../../history';

import {logOut} from "../../actions/signActions";
import {fetchBoards} from "../../actions/boardActions";
import {fetchCircles, setCircle} from "../../actions/circleActions";
import {setBoard} from "../../actions/boardActions";

// Css...
import logo from '../../assets/prello_logo.png';
import './NavBar.css';
import {Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';

// Actions & Constant

export class NavBarToBeConnected extends React.Component {

    logOut = () => {
        /*
        const temp = [];
        const board = {
            _id: "",
            name: "",
            idOrganization: "",
            closed: false,
            desc: "",
            memberships: [],
            lists: [],
        };
        this.props.fetchCircles(temp);
        this.props.fetchBoards(temp);
        this.props.setBoard(board);
        this.props.setCircle(temp);
        */
        this.props.logOut();
        history.push('/');
        console.log(this.props.circles);
        console.log(this.props.circle);
        console.log(this.props.boards);
        console.log(this.props.board);
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

    redirectionAccount = () => {
        history.push('/account')
    };

    render() {
        const {
            user,
            noLink
        } = this.props;
        return (
            <Navbar expand="md">
                {!(user.member) ?
                    <NavbarBrand><img onClick={() => this.redirectionMain()} src={logo} style={{width:100, marginTop: -5}} /></NavbarBrand>
                    :
                    <NavbarBrand><img onClick={() => this.redirectionHome()} src={logo} style={{width:100, marginTop: -5}} /></NavbarBrand>
                }
                {!(user.member) && !(noLink==="true") &&
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
                {(user.member) && !(noLink==="true") &&
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="helpNavItem" href="#" onClick={() => this.redirectionHome()}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="helpNavItem" href="#" onClick={() => this.redirectionAccount()}>My account</NavLink>
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
    user: state.user,
    circle: state.circle,
    circles: state.circles,
    boards: state.boards,
    board: state.board
});
const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch( logOut()),
    fetchBoards: (res) => dispatch(fetchBoards(res)),
    fetchCircles: (res) => dispatch(fetchCircles(res)),
    setBoard: (res) => dispatch(setBoard(res)),
    setCircle: (res) => dispatch(setCircle(res)),
});

export const NavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)( NavBarToBeConnected )