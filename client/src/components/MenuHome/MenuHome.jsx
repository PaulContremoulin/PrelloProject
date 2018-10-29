// Modules
import React from 'react';
import './MenuHome.css';

//import {} from 'reactstrap';

// Css...

// Actions & Constant

export class MenuHome extends React.Component {
    render() {
        return (
            <div className="vertical-menu">
                <h3>Board</h3>
                <a href="#">Personnal's Boards</a>
                <h3>Circles</h3>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
                <a href="#">Link 4</a>
                <h3>Team</h3>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
                <a href="#">Link 4</a>
            </div>
        )
    }
}
