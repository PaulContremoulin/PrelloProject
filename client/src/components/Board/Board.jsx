import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

// Components & Actions
import {BoardMenu} from './BoardMenu/BoardMenu';
import {List} from './List/List';
import {AddList} from './AddList/AddList';
import {addList, moveList, addCard, moveCard, moveCardFromList} from '../../actions/boardActions';
import { setListName } from '../../actions/listActions';
import { postListToBoard, postCardToBoard } from '../../requests/boards';
import { changeListName } from '../../requests/lists';

// Css
import { Container, Row, Col, CardDeck } from 'reactstrap';
import './Board.css';

const ContainerBoard = styled.div``;

export class BoardToBeConnected extends React.Component {
  constructor(props) {
      super(props)
  }

  onDragEnd = result => {
    console.log(result);
    const { destination, source, draggableId, type } = result;

    // If the card hasnt been moved to a droppable position
    if (!destination) {
      return;
    } else if ( // If the card is dropped in its starting position
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const contextBoard = this.props.board;

    if( type === "list" ) {
      const newListOrder = Array.from(contextBoard.lists);
      const listDragged = contextBoard.lists[source.index];
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, listDragged);

      this.props.moveList(newListOrder);
      return;
    }

    const contextListStart = contextBoard.lists.filter( list => list.id == source.droppableId )[0];
    const contextListEnd = contextBoard.lists.filter( list => list.id == destination.droppableId )[0];

    // Move a card inside a list
    if (contextListStart === contextListEnd) {
      const newCardList = Array.from(contextListStart.cards);
      newCardList.splice(source.index, 1);
      newCardList.splice(destination.index, 0, contextListStart.cards[source.index]);

      const newContextList = {
        ...contextListStart,
        cards: newCardList,
      }
      const indexOfList = contextBoard.lists.findIndex( (list, index) => list.id === contextListStart.id );

      this.props.moveCard(newContextList, indexOfList);
      return;
    }

    //From a list to another
    // Source list
    const newCardListStart = Array.from(contextListStart.cards);
    newCardListStart.splice(source.index, 1);
    // newCardListStart.splice(destination.index, 0, contextListStart.cards[source.index]);

    const newContextListStart = {
      ...contextListStart,
      cards: newCardListStart,
    }

    // Destination list
    const newCardListEnd = Array.from(contextListEnd.cards);
    // newCardListEnd.splice(source.index, 1);
    newCardListEnd.splice(destination.index, 0, contextListStart.cards[source.index]);

    const newContextListEnd = {
      ...contextListEnd,
      cards: newCardListEnd,
    }
    const indexOfListStart = contextBoard.lists.findIndex( (list, index) => list.id === contextListStart.id );
    const indexOfListEnd = contextBoard.lists.findIndex( (list, index) => list.id === contextListEnd.id );

    this.props.moveCardFromList(newContextListStart, indexOfListStart, newContextListEnd, indexOfListEnd);
    return;
  };

  setNameOfList = (listId, listName) => {
    changeListName(listId, listName)
    .then( () => this.props.setListName(listId, listName) )
  }

  addCardToBoard = (cardName, listId, boardId) => { // pos to be added later
    postCardToBoard(cardName, listId, boardId)
    .then( newCard => {
      this.props.addCard(newCard.data)
    })
  }

  addListToBoard = (listName, boardId) => { // position to be added later
    postListToBoard(listName, boardId)
    .then( newList => {
      this.props.addList(newList.data)
    })
  }

  render() {
    const { board, addList, moveList, addCard, moveCard } = this.props;
    return(
      <div className="Board">
        <BoardMenu boardName={ board.name } />
          <div className="Lists">
            <DragDropContext
              onDragStart={() => {}}
              onDragUpdate={() => {}}
              onDragEnd={ this.onDragEnd }
            >
            <Droppable droppableId="allLists" direction="horizontal" type="list" >
              {(provided, snapshot) =>
                <ContainerBoard
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDragging={ snapshot.isDragging }
                >
                <CardDeck style={{"width": (board.lists.length+1)*300 + "px"}}>
                    {board.lists.map( (list, index) => (
                      <div key={index} style={{"width": "300px"}}>
                        <List
                          board={board}
                          list={list}
                          addCard={(cardName, listId) => this.addCardToBoard(cardName, listId, board._id)}
                          moveList={moveList}
                          setNameOfList= { (listName) => this.setNameOfList(list.id, listName) }
                          index={index}
                        />
                      </div>
                    ))
                    }
                    <AddList addList={(listName) => this.addListToBoard(listName, board._id)}/>
                  </CardDeck>
                  {provided.placeholder}
                  </ContainerBoard>
                }
              </Droppable>
            </DragDropContext>
          </div>
      </div>
    )
  }
}

const mapStateToProps = ( state, props ) => ({
   board: state.board
})

const mapDispatchToProps = ( dispatch ) => ({
  addList: (listName, boardId) => dispatch( addList(listName, boardId) ),
  moveList: (newListOrder) => dispatch( moveList(newListOrder) ),
  addCard: (card) => dispatch( addCard(card) ),
  moveCard: (newList, indexOfList) => dispatch( moveCard(newList, indexOfList) ),
  setListName: (listId, listName) => dispatch( setListName(listId, listName) ),
  moveCardFromList: (newListStart, indexOfListStart, newListEnd, indexOfListEnd) => dispatch( moveCardFromList(newListStart, indexOfListStart, newListEnd, indexOfListEnd) ),
})

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps,
)( BoardToBeConnected );
