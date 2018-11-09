import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// Components & Actions
import {CardComponent} from './Card/Card';
import './List.css';
import { AddCard } from './AddCard/AddCard';

// Css
import { Container, Row, Col, Card, CardText, CardBody, CardTitle, Button, Input } from 'reactstrap';
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
        inputNameList: false
      }
  }

  handleOnBlur = (event) => {
    const newName = event.target.value;
    if (newName !== this.props.list.name) {
      this.props.setNameOfList( newName );
    }
    this.setState({ inputNameList: false })
  }

  render() {
    const { list, board, moveList, addCard, setNameOfList, index } = this.props;
    return (
      <Draggable draggableId={list.id} index={index} >
        {(provided) =>
          <ContainerList
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <CardTitle
              className="ListTitle"
              onClick={() => this.setState({ inputNameList: true })}
              {...provided.dragHandleProps}
            >
              {(this.state.inputNameList) ?
                <Input
                  type="text"
                  name="listName"
                  required={true}
                  defaultValue={list.name}
                  onBlur={(e) => this.handleOnBlur(e)}
                />
                :
                list.name
              }
              </CardTitle>
            <Droppable
              droppableId={list.id.toString()}
              type="card"
            >{(provided) =>
              <CardList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Card className="List" style={{"width": "272px", "margin-left": "8px"}}>
                { (list.cards != null) ?
                  list.cards.map( (card, index) => (
                    (card.closed) ?
                    null
                    :
                    <div key={index}>
                      <CardComponent listId={list.id} card={card} index={index} />
                    </div>
                  ) )
                  :
                  null
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
