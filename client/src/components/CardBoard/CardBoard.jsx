// Modules
import React from 'react';
import {Card, CardHeader, CardTitle, CardBody, CardText} from 'reactstrap';

// Css...

// Actions & Constant

export class CardBoard extends React.Component {

    render() {
        return (
            <Card style={{ backgroundColor: this.props.board.color}}>
                <CardBody>
                    <CardText>{this.props.board.name}</CardText>
                </CardBody>
            </Card>
        )
    }
}