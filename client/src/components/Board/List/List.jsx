import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// Components & Actions
import {CardComponent} from './Card/Card';
import './List.css';
import { AddCard } from './AddCard/AddCard';

// Css
import { Container, Row, Col, Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import styled from 'styled-components';

const ContainerList = styled.div`
  width: 272px;
  margin: 8px;
  display: flex;
  flex-direction: column;
`;
const TitleList = styled.h3``;
const CardList = styled.div`
  flex-grow: 1;
  min-height: 100px;
`;

export class List extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
      }
  }


  render() {
    const { list, moveList, addCard, index } = this.props;
    return (
      <Draggable draggableId={list.id} index={index} >
        {(provided) =>
          <ContainerList
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <CardTitle className="ListTitle" {...provided.dragHandleProps}>{list.name}</CardTitle>
            <Droppable
              droppableId={list.id.toString()}
              type="card"
            >{(provided) =>
              <CardList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Card className="List" style={{"width": "272px", "margin-left": "8px"}}>{
                  list.cards.map( (card, index) => (
                    <div key={index}>
                      <CardComponent card={card} index={index} />
                    </div>
                  ) )
                }{provided.placeholder}
                <AddCard addCard={ (cardName) => addCard(cardName, list.id) } />
                </Card>
              </CardList>
            }</Droppable>
          </ContainerList>
        }
      </Draggable>
    )
  }
}
