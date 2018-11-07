import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

// Components & Actions
import {BoardMenu} from './BoardMenu/BoardMenu';
import {List} from './List/List';
import {AddList} from './AddList/AddList';
import {addList, moveList, addCard, moveCard} from '../../actions/boardActions';

// Css
import { Container, Row, Col, CardDeck } from 'reactstrap';
import './Board.css';

export class BoardToBeConnected extends React.Component {
  constructor(props) {
      super(props)
  }

  onDragEnd = result => {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    } else if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const contextBoard = this.props.board;
    const contextList = contextBoard.lists.filter( list => list.listId == source.droppableId )[0];
    const newCardList = Array.from(contextList.cards);
    newCardList.splice(source.index, 1);
    newCardList.splice(destination.index, 0, contextList.cards[source.index]);

    const newContextList = {
      ...contextList,
      cards: newCardList,
    }
    const indexOfList = contextBoard.lists.findIndex( (list, index) => list.listId === contextList.listId );
    const newArrayList = Array.from(contextBoard.lists);
    newArrayList.splice(indexOfList, 1);
    newArrayList.splice(indexOfList, 0, newContextList);

    const newBoard = {
      ...contextBoard,
      lists: newArrayList
    }
    console.log(newBoard);

    this.props.moveCard(newContextList, indexOfList);

    return;
  };

  render() {
    const { board, addList, moveList, addCard, moveCard } = this.props;
    return(
      <div className="Board">
        <BoardMenu boardName={ board.boardName } />
          <div className="Lists">
            <DragDropContext
              onDragStart={() => {}}
              onDragUpdate={() => {}}
              onDragEnd={ this.onDragEnd }
            ><CardDeck style={{"width": (board.lists.length+1)*300 + "px"}}>
                {board.lists.map( (list, index) => (
                  <div key={index} style={{"width": "300px"}}>
                    <List
                      board={board}
                      list={list}
                      addCard={addList}
                      moveList={moveList}
                    />
                  </div>
                ))
                }
                <AddList addList={(listName) => addList(listName)}/>
              </CardDeck>
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
  addList: (listName) => dispatch( addList(listName) ),
  moveList: (listId, index) => dispatch( moveList(listId, index) ),
  addCard: (cardName, listId) => dispatch( addCard(cardName, listId) ),
  moveCard: (newList, indexOfList) => dispatch( moveCard(newList, indexOfList) ),
})

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps,
)( BoardToBeConnected );
