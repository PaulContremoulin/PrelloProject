// Modules
import React from 'react';
import { history } from '../../history';

// Css...
import {Card, CardHeader, CardTitle, CardBody, CardText} from 'reactstrap';

// Actions & Constant

export class CardBoard extends React.Component {

    goToBoard = () => {
      this.props.setBoard();
      history.push('/board');
    }

    render() {
      const { board, setBoard } = this.props;
        return (
            <Card style={{ backgroundColor: board.color}} onClick={ () => this.goToBoard() }>
                <CardBody>
                    <CardText>{board.name}</CardText>
                </CardBody>
            </Card>
        )
    }
}
