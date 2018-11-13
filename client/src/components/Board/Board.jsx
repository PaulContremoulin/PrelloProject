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
import { changeListName } from '../../requests/lists';
import { nextPosFromArray } from '../../boardUtil.js';
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
    addCardToBoard = (cardName, cardPos, listId, boardId) => { // pos to be added later
      console.log(boardId);
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
    }
    render() {
        const { board, addList, moveList, addCard, moveCard } = this.props;
        const boardId = (board._id) ? board._id : board.id;
        console.log(boardId);
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
                                            <CardDeck style={{"width": (board.lists.length + 1) * 300 + "px"}}>
                                                {board.lists.map((list, index) => (
                                                    <div key={index} style={{"width": "300px"}}>
                                                        <List
                                                            board={board}
                                                            list={list}
                                                            addCard={(cardName, listId) => this.addCardToBoard(cardName, nextPosFromArray(list.cards), listId, boardId)}
                                                            moveList={moveList}
                                                            setNameOfList={(listName) => this.setNameOfList(list.id, listName)}
                                                            index={index}
                                                        />
                                                    </div>
                                                ))
                                                }
                                                <AddList
                                                    addList={(listName) => this.addListToBoard(listName, nextPosFromArray(board.lists), boardId)}/>
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
