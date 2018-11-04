// Modules
import React from 'react';
import {Card, CardBody, CardTitle} from 'reactstrap';

// Css...

// Actions & Constant

export class CardBoard extends React.Component {

    render() {
        return (
            <Card body>
                    <CardTitle>{this.props.board.name}</CardTitle>
            </Card>
        )
    }
}