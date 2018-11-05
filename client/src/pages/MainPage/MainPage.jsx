// Modules
import React from 'react';
import {history} from '../../history';

// Css...
import './MainPage.css';
import {NavBar} from "../../components/NavBar/NavBar";
import {Button} from 'reactstrap';

// Actions & Constant

export class MainPage extends React.Component {

    redirectionLogin = () => {
        history.push('/login')
    };

    redirectionRegistration = () => {
        history.push('/registration')
    };

    render() {
        return (
            <div className="MainPage">
                <NavBar/>
                <Button onClick={() => this.redirectionLogin()}>Sign In</Button>
                <Button onClick={() => this.redirectionRegistration()}>Sign Up</Button>
            </div>
        )
    }
};