import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

// Components & Actions
import {CardComponent} from './Card/Card';
import './List.css';
import { CardModal } from './CardModal/CardModal';
import { AddCard } from './AddCard/AddCard';

// Css
import { Container, Row, Col, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import styled from 'styled-components';

const ContainerList = styled.div`
  width: "272px";
  margin: 8px;
`;
const TitleList = styled.h3``;
const CardList = styled.div`
`;

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
    console.log(list);
    return (
      <ContainerList>
        <CardTitle style={{"margin-left": "10px"}}>{list.listName}</CardTitle>
        <Droppable droppableId={list.listId.toString()}
        >{(provided) =>
          <CardList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Card className="List" style={{"width": "272px", "margin-left": "8px"}}>{
              list.cards.map( (card, index) => (
                <div key={index}>
                  <CardComponent card={card} index={index} openModal={() => this.openModal()} />
                  <CardModal card={card} open={this.state.open} openModal={() => this.openModal()} closeModal={() => this.closeModal()} />
                </div>
              ) )
            }{provided.placeholder}
            <AddCard addCard={ (cardName) => addCard(cardName) } />
            </Card>
          </CardList>
        }</Droppable>
      </ContainerList>
    )
  }
}
// TODO: Card modal ouvre la dernière modal créée.
