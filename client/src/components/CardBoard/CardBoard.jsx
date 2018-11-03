// Modules
import React from 'react';
import {Card, CardBody, CardTitle} from 'reactstrap';

// Css...

// Actions & Constant

export class CardBoard extends React.Component {

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>{this.props.board.name}</CardTitle>
                    </CardBody>
                </Card>
            </div>
        )
    }
}