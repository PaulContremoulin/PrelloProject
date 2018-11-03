// Modules
import React from 'react';
import {Container, Row, Col, Alert} from 'reactstrap';

// Css...

// Actions & Constant

export class CardBoard extends React.Component {

    render() {
        return (
            <div>
                <h2>{this.props.board.name}</h2>
            </div>
        )
    }
}