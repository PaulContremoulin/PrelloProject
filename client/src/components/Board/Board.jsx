import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import * as qs from 'query-string';
import { history } from '../../history';
import { socket } from '../../redux/middleware/websocket';
// Components & Actions
import { DEFAULT_BOARD } from '../../constants';
import {BoardMenu} from './BoardMenu/BoardMenu';
import {List} from './List/List';
import {AddList} from './AddList/AddList';
import {setBoard, addList, moveList, addCard, moveCard, moveCardFromList} from '../../actions/boardActions';
import {resetComments} from '../../actions/commentActions';
import {resetChecklists} from '../../actions/checkObjectActions';
import { setListName } from '../../actions/listActions';
import { postListToBoard, postCardToBoard, getListsOfBoard, getBoardById } from '../../requests/boards';
import { changeListName, changeListPos } from '../../requests/lists';
import { changeCardPos, changeCardPosAndList } from '../../requests/cards';
import { nextPosFromArray, calcPos, setupAllPos, calcNextPos } from '../../boardUtil.js';
// Css
import { Container, Row, Col, CardDeck, Alert } from 'reactstrap';
import './Board.css';
const ContainerBoard = styled.div``;
export class BoardToBeConnected extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isGood: true,
        }
    }
    onDragEnd = result => {
        // console.log(result);
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
        // Current board
        const contextBoard = this.props.board;

        // LIST DRAGGED
        if( type === "list" ) {
            var newListOrder = Array.from(contextBoard.lists);
            // Default : From left to right
            var lowerIndex = destination.index;
            var upperIndex = destination.index+1;
            // from right to left
            if (destination.index < source.index) {
              lowerIndex = destination.index-1;
              upperIndex = destination.index;
            }
            var nextPos;
            (destination.index == (contextBoard.lists.length-1)) ? nextPos = calcNextPos(contextBoard.lists[destination.index])
            : (destination.index == 0) ? nextPos =  calcPos({ pos: 0}, contextBoard.lists[upperIndex])
            : nextPos =  calcPos(contextBoard.lists[lowerIndex], contextBoard.lists[upperIndex]);

            const listDragged = { ...contextBoard.lists[source.index], pos: nextPos, };
            newListOrder.splice(source.index, 1);
            newListOrder.splice(destination.index, 0, listDragged);
            if(!nextPos) {
              newListOrder = setupAllPos(newListOrder);
              nextPos = newListOrder[destination.index].pos;
              newListOrder.map(
                list => {
                  changeListPos(list.id, list.pos)
                  return list;
              })
            } else {
              changeListPos(listDragged.id, listDragged.pos)
                .catch( () => this.props.moveList(contextBoard.lists))
            }
            this.props.moveList(newListOrder);
            return;
        }

        // CARD DRAGGED
        const contextListStart = contextBoard.lists.filter( list => list.id == source.droppableId )[0];
        const contextListEnd = contextBoard.lists.filter( list => list.id == destination.droppableId )[0];

        var nextPos;
        // Default : From up to down
        var lowerIndex = destination.index;
        var upperIndex = destination.index+1;

        // Move a card inside a list
        if (contextListStart === contextListEnd) {
            var newCardList = Array.from(contextListStart.cards);
            // from down to up
            if (destination.index < source.index) {
              lowerIndex = destination.index-1;
              upperIndex = destination.index;
            }

            (destination.index == (contextListStart.cards.length-1)) ? nextPos = calcNextPos(contextListStart.cards[destination.index])
            : (destination.index == 0) ? nextPos =  calcPos({ pos: 0}, contextListStart.cards[upperIndex])
            : nextPos =  calcPos(contextListStart.cards[lowerIndex], contextListStart.cards[upperIndex]);
            const cardDragged = { ...contextListStart.cards[source.index], pos: nextPos, };

            newCardList.splice(source.index, 1);
            newCardList.splice(destination.index, 0, cardDragged);
            // Index of list in board's lists
            const indexOfList = contextBoard.lists.findIndex( (list, index) => list.id === contextListStart.id );

            if(!nextPos) {
              newCardList = setupAllPos(newCardList);
              nextPos = newCardList[destination.index].pos;
              newCardList.map(
                card => {
                  changeCardPos(card.id, card.pos)
                  return card;
              })
            } else {
              changeCardPos(cardDragged.id, cardDragged.pos)
                .catch( () => this.props.moveCard(contextListStart, indexOfList))
            }
            const newContextList = {
                ...contextListStart,
                cards: newCardList,
            }
            this.props.moveCard(newContextList, indexOfList);
            return;
        }

        //From a list to another
        // Source list
        var newCardListStart = Array.from(contextListStart.cards);
        // Destination list
        var newCardListEnd = Array.from(contextListEnd.cards);
        lowerIndex = destination.index-1;
        upperIndex = destination.index;
        const indexOfListStart = contextBoard.lists.findIndex( (list, index) => list.id === contextListStart.id );
        const indexOfListEnd = contextBoard.lists.findIndex( (list, index) => list.id === contextListEnd.id );

        (destination.index === (newCardListEnd.length)) ? nextPos = nextPosFromArray(newCardListEnd)
        : (newCardListEnd.length === 0) ? nextPos = nextPosFromArray(newCardListEnd)
        : (destination.index === 0) ? nextPos =  calcPos({ pos: 0}, newCardListEnd[upperIndex])
        : nextPos =  calcPos(newCardListEnd[lowerIndex], newCardListEnd[upperIndex]);
        const cardDragged = { ...newCardListStart[source.index], pos: nextPos, };

        newCardListEnd.splice(destination.index, 0, cardDragged);
        const newContextListEnd = {
          ...contextListEnd,
          cards: newCardListEnd,
        }

        if(!nextPos) {
          newCardListEnd = setupAllPos(newCardListEnd);
          nextPos = newCardListEnd[destination.index].pos;
          newCardListEnd.map(
            card => {
              changeCardPosAndList(card.id, card.pos, contextListEnd.id)
              return card;
          })
        } else {
          changeCardPosAndList(cardDragged.id, cardDragged.pos, contextListEnd.id)
            // .catch( () => this.props.moveCardFromList(contextListStart, source, contextListEnd, indexOfListEnd))
        }
        newCardListStart.splice(source.index, 1);
        const newContextListStart = {
          ...contextListStart,
          cards: newCardListStart,
        }
        this.props.moveCardFromList(newContextListStart, indexOfListStart, newContextListEnd, indexOfListEnd);

        console.log(contextListStart.cards);
        console.log(contextListEnd.cards);
        console.log(cardDragged);
        console.log(newContextListStart.cards);
        console.log(newContextListEnd.cards);
        return;
    };


    setNameOfList = (listId, listName, boardId) => {
        changeListName(listId, listName)
            .then( () => this.props.setListName(listId, listName, boardId) )
    }
    addCardToBoard = (cardName, cardPos, listId, boardId) => { // pos to be added later
        postCardToBoard(cardName, cardPos, listId, boardId)
            .then( newCard => {
                this.props.addCard(newCard.data)
            })
    }
    addListToBoard = (listName, listPos, boardId) => { // position to be added later
        postListToBoard(listName, listPos, boardId)
            .then( newList => {
                this.props.addList(newList.data)
            })
    }
    componentDidMount() {
        const url = history.location.pathname.split('/');
        if (url.length > 3) {
          const idBoard = history.location.pathname.split('/')[2];
          const boardName = history.location.pathname.split('/')[3];
          if(idBoard) {
            socket.emit('subscribe', idBoard);
            if (this.props.board._id !== idBoard) {
                this.props.setBoard(DEFAULT_BOARD);
            }
            getBoardById(idBoard)
            .then( boardfetch => {
                const setupBoard = boardfetch.data;
                getListsOfBoard(idBoard, true)
                .then( lists => {
                  setupBoard["lists"] = lists.data;
                  if (setupBoard.name === boardName) {
                      this.props.setBoard(setupBoard);
                  } else {
                      this.setState({isGood:false})
                  }
                })
            })
            .catch( err => this.setState({isGood:false}))
          }
        }
    }

    componentWillUnmount() {
        this.props.resetComments(); // resets the comments reducer
        this.props.resetChecklists(); // resets the checklists reducer
        socket.emit('unsubscribe', this.props.board._id);
        //const idBoard = history.location.pathname.split('/')[2];
        //socket.emit('unsubscribe', idBoard);
    }
    render() {
        const { board, addList, moveList, addCard, moveCard } = this.props;
        const boardId = (board._id) ? board._id : board.id;
        const color = (board.prefs && board.preds.background) ? board.prefs.background : "#ffffff";
        return(
            <div className="Board">
                {this.state.isGood ?
                    <div>
                        <BoardMenu boardName={board.name} boardId={boardId} color={color}/>
                        <div className="Lists">
                            <DragDropContext
                                onDragStart={() => {
                                }}
                                onDragUpdate={() => {
                                }}
                                onDragEnd={this.onDragEnd}
                            >
                                <Droppable droppableId="allLists" direction="horizontal" type="list">
                                    {(provided, snapshot) =>
                                        <ContainerBoard
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            isDragging={snapshot.isDragging}
                                        >
                                            <CardDeck style={{"width": (board.lists.length + 1) * 320 + "px"}}>
                                                {board.lists.map((list, index) => (
                                                    <div key={index} style={{"width": "320px"}}>
                                                        <List
                                                            board={board}
                                                            list={list}
                                                            addCard={(cardName, listId) => this.addCardToBoard(cardName, nextPosFromArray(list.cards), listId, boardId)}
                                                            moveList={moveList}
                                                            setNameOfList={(listName) => this.setNameOfList(list.id, listName, boardId)}
                                                            index={index}
                                                        />
                                                    </div>
                                                ))
                                                }
                                                <div style={{"width":"304px"}}>
                                                    <AddList
                                                        addList={(listName) => this.addListToBoard(listName, nextPosFromArray(board.lists), boardId)}/>
                                                </div>
                                            </CardDeck>
                                            {provided.placeholder}
                                        </ContainerBoard>
                                    }
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>
                    :
                    <Alert color="danger">
                        You don't have permission to access on this board
                    </Alert>
                }
            </div>
        )
    }
}
const mapStateToProps = ( state, props ) => ({
    board: state.board,
})
const mapDispatchToProps = ( dispatch ) => ({
    setBoard: (board) => dispatch( setBoard(board)),
    addList: (listName) => dispatch( addList(listName) ),
    moveList: (newListOrder) => dispatch( moveList(newListOrder) ),
    addCard: (card) => dispatch( addCard(card) ),
    moveCard: (newList, indexOfList) => dispatch( moveCard(newList, indexOfList) ),
    setListName: (listId, listName) => dispatch( setListName(listId, listName) ),
    moveCardFromList: (newListStart, indexOfListStart, newListEnd, indexOfListEnd) => dispatch( moveCardFromList(newListStart, indexOfListStart, newListEnd, indexOfListEnd) ),
    resetComments: () => dispatch( resetComments()),
    resetChecklists: () => dispatch( resetChecklists()),
})
export const Board = connect(
    mapStateToProps,
    mapDispatchToProps,
)( BoardToBeConnected );
