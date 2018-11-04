import React from 'react';

// Components & Actions
import {CardComponent} from './Card/Card';
import './List.css';

// Css
import { Container, Row, Col, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { AddCard } from './AddCard/AddCard';
import { CardModal } from './CardModal/CardModal';

export class List extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        open: false
      }
  }

  openModal = () => {
      this.setState({ open: true })
  }

  closeModal = () => {
      this.setState({
          open: false,
      })
  }

  render() {
    const { list, moveList, addCard } = this.props;
    return (
      <Card className="List">
          <CardTitle>{list.listName}</CardTitle>
            {
              list.cards.map( (card, index) => (
                <div key={index} >
                  <CardComponent card={card} openModal={() => this.openModal()}/>
                  <CardModal card={card} open={this.state.open} openModal={() => this.openModal()} closeModal={() => this.closeModal()} />
                </div>
              ) )
            }
            <AddCard addCard={ (cardName) => addCard(cardName) } />
      </Card>
    )
  }
}
