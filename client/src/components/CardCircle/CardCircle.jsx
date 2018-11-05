// Modules
import React from 'react';
import {Card, CardHeader, CardTitle, CardBody} from 'reactstrap';

// Css...

// Actions & Constant

export class CardCircle extends React.Component {

    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>{this.props.circle.name}</CardTitle>
                </CardBody>
            </Card>
        )
    }
}