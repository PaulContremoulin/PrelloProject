// Modules
import React from 'react';
import {Card, CardHeader, CardTitle, CardBody} from 'reactstrap';

// Css...

// Actions & Constant

export class CardBoard extends React.Component {

    render() {
        return (
            <Card style={{ backgroundColor: this.props.board.color}}>
                <CardBody>
                    <CardTitle>{this.props.board.name}</CardTitle>
                </CardBody>
            </Card>
        )
    }
}