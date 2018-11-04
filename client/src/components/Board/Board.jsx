import React from 'react';
import { connect } from 'react-redux';

// Components & Actions
import {BoardMenu} from './BoardMenu/BoardMenu';
import {List} from './List/List';
import {AddList} from './AddList/AddList';
import {addList, moveList, addCard, moveCard} from '../../actions/boardActions';

// Css
import { Container, Row, Col, CardDeck } from 'reactstrap';
import './Board.css';

export const BoardToBeConnected = ({ board, addList, moveList, addCard, moveCard }) => (
    <div className="Board">
      <BoardMenu boardName={ board.boardName } />
      <div className="Lists">
        <CardDeck style={{"width": (board.lists.length+1)*272 + "px"}}>
          { board.lists.map( (list, index) => (
            <List
              key={index}
              list={list}
              moveList={() => moveList(list.listId, index)}
              addCard={ (cardName) => addCard(cardName, list.listId) }
            />
          )) }
          <AddList addList={(listName) => addList(listName)}/>
        </CardDeck>
      </div>
    </div>
)

const mapStateToProps = ( state, props ) => ({
   board: state.board
})

const mapDispatchToProps = ( dispatch ) => ({
  addList: (listName) => dispatch( addList(listName) ),
  moveList: (listId, index) => dispatch( moveList(listId, index) ),
  addCard: (cardName, listId) => dispatch( addCard(cardName, listId) ),
  moveCard: (cardId, index) => dispatch( moveCard(cardId, index) ),
})

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps,
)( BoardToBeConnected );
