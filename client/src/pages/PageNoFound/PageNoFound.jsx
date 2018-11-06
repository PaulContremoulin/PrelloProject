// Modules
import React from 'react';
import {history} from '../../history';

// Css...
import './PageNoFound.css';
import {NavBar} from "../../components/NavBar/NavBar";
import {Button} from 'reactstrap';

// Actions & Constant

export class PageNoFound extends React.Component {

    redirectionHome = () => {
        history.push('/')
    };

    render() {
        return (
            <div className="PageNoFound">
                <NavBar/>
                <div className="text-center">
                    <h1>404</h1>
                    <h2>Oops, This Page No Found!</h2>
                </div>
                <div className="text-center">
                    <Button onClick={() => this.redirectionHome()}>Go back Home</Button>
                </div>
            </div>
        )
    }
}