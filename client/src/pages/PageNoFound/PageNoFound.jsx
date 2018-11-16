// Modules
import React from 'react';
import {history} from '../../history';
import {Button} from 'reactstrap';

// Css...
import './PageNoFound.css';

// Actions & Constant

export class PageNoFound extends React.Component {

    redirectionHome = () => {
        history.push('/')
    };

    render() {
        return (
            <div className="PageNoFound">
                <div className="text-center">
                    <h1>404</h1>
                    <h2>Oops, This Page Not Found!</h2>
                </div>
                <div className="text-center">
                    <Button onClick={() => this.redirectionHome()}>Go back Home</Button>
                </div>
            </div>
        )
    }
}