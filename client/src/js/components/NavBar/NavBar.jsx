// Modules
import React from 'react';

// Css...

// Actions & Constant


export class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#">Prello</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                </button>

                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sign in</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sign up</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}