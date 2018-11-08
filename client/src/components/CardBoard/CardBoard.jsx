// Modules
import React from 'react';

// Css...
import {Card, CardHeader, CardTitle, CardBody, CardText} from 'reactstrap';

// Actions & Constant

export class CardBoard extends React.Component {


    render() {
      const { board, goToPageBoard } = this.props;
        return (
            <Card style={{ backgroundColor: board.color}} onClick={ () => goToPageBoard() }>
                <CardBody>
                    <CardText>{board.name}</CardText>
                </CardBody>
            </Card>
        )
    }
}
