// Modules
import React from 'react';
import {connect} from 'react-redux';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input, Alert, Badge, Popover, PopoverHeader, PopoverBody, InputGroup,} from 'reactstrap';


// Css
import './CardModal.css';

// Actions & Constant
import {AddChecklist} from './AddChecklist/AddChecklist';
import {AddComment} from './AddComment/AddComment';
import {LabelComponent} from './Label/Label';
import {AddLabel} from './AddLabel/AddLabel';

import {TitleCard} from "./TitleCard/TitleCard";
import {DateCalendar} from "./DateCalendar/DateCalendar";
import {DescCard} from "./DescCard/DescCard";
import {ChecklistsCard} from "./ChecklistsCard/ChecklistsCard";
import {CommentsCard} from "./CommentsCard/CommentsCard";

import {changeCardName, changeCardDueDate, changeCardDesc, changeCardClosed, deleteCardRequest} from '../../../../../requests/cards';
import { getChecklists} from '../../../../../requests/checklists';
import {getComments, postCommentToCard, putTextToComment} from '../../../../../requests/comments';
import {getLabel, postLabel, putLabel, deleteLabel, removeLabelFromCard, postLabelToCard} from '../../../../../requests/labels';

import {
    checklistSetName,
    checklistSetPos,
    checkItemSetName,
    checkItemSetPos,
    checkItemSetState,
    checkListDelete,
    checkItemDelete,
    addCheckItem} from '../../../../../actions/checkObjectActions';
import {setName, setDesc, setDue, setClosed, addChecklist, setChecklists, setDueComplete} from '../../../../../actions/cardActions';
import {setComments, addComment, setTextComment} from '../../../../../actions/commentActions';
import {setLabels, addLabel, setNameLabel, setColorLabel, deleteLabelFromBoard} from '../../../../../actions/labelActions';
import {deleteCard} from "../../../../../actions/boardActions";


export class CardModalToBeConnected extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            openInputHeader: false,
            descInput: false,
            dueDateInput: false,
            addChecklist: false,
            openTags: false,
            popoverAddChecklist : false,
            archiveModal : false,
            deleteModal : false
        }
    }

    componentDidMount() {
        const cardId = this.props.card.id;
        getChecklists(cardId)
            .then(res => {
                this.props.setChecklists(res.data);
            })
            .catch(error => {
                console.log(error)
            });
        getComments(cardId)
            .then(res => {
                this.props.setComments(res.data);
            })
            .catch(error => {
                console.log(error)
            });
    }

    closeCard = () => {
        const cardId = this.props.card.id;
        changeCardClosed(cardId, true)
            .then(() => this.props.setClosed(this.props.listId, cardId, true, this.props.boardId))
    };

    deleteCardEvent = () => {
        deleteCardRequest(this.props.card.id)
            .then(() => this.props.deleteCard(this.props.card))
    }

    // COMMENTS
    addCommentToCard = (commentText) => {
        const cardId = this.props.card.id;
        const boardId = this.props.boardId;
        postCommentToCard(commentText, cardId)
            .then(comment => this.props.addComment(comment.data, boardId))
    };

    // Tags
    toggleTags = () => {
        this.setState({openTags: !this.state.openTags})
    };

    toggleArchive = () => {
        this.setState({archiveModal: !this.state.archiveModal})
    };

    toggleDelete = () => {
        this.setState({deleteModal: !this.state.deleteModal})
    };

    render() {
        const {openInputHeader, openTags} = this.state;
        const {
            card,
            boardId, checklists, comments, labels,
            checkListDelete, addCheckItem,
            open,
            listId,
            closeModal,
            setDue, setName, setDesc,
            setComments, addComment, setTextComment,
            addChecklist,
            checklistSetName, checklistSetPos,
            checkItemSetName, checkItemSetPos, checkItemSetState,
            checkItemDelete
        } = this.props;

        return (
            <Modal className="cardModal" isOpen={open} toggle={() => closeModal()} centered={true}>
                <ModalHeader className="cardModalHeader" toggle={() => closeModal()}>
                    <TitleCard
                        cardId={card.id}
                        name={card.name}
                        setName={(name) => {
                            setName(listId, card.id, name, boardId)
                        }}
                    />
                    <DateCalendar
                        cardId={card.id}
                        setDue={(due) => {
                            setDue(listId, card.id, due, boardId)
                        }}
                        setDueComplete={(dueComplete) => {
                            setDueComplete(listId, card.id, dueComplete)
                        }}
                        due={card.due}
                        dueComplete={card.dueComplete}
                    />
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm="9" className="cardCore">
                            <DescCard
                                cardId={card.id}
                                setDesc={(desc) => {
                                    setDesc(listId, card.id, desc, boardId)
                                }}
                                desc={card.desc}
                            />
                            <ChecklistsCard
                                checklists={checklists}
                                checklistSetName={checklistSetName}
                                checklistSetPos={checklistSetPos}
                                checkItemSetName={ (idChecklist, checklistName) => {
                                    checklistSetName(idChecklist, checklistName, boardId)
                                }}
                                checkItemSetPos={checkItemSetPos}
                                checkListDelete={(idChecklist) => {
                                    checkListDelete(boardId, card.id, idChecklist)
                                }}
                                addCheckItem={(idCheckList, checkItem) => {
                                    addCheckItem(boardId, card.id, idCheckList, checkItem)
                                }}
                                checkItemSetState={(idCheckItem, checkItemState, idChecklist) => {
                                    checkItemSetState(idCheckItem, checkItemState, boardId, card.id, idChecklist)
                                }}
                                checkItemDelete={(idChecklist, idCheckItem) => {
                                    checkItemDelete(boardId, card.id, idChecklist, idCheckItem)
                                }}
                            />
                            <CommentsCard
                                cardId={card.id}
                                comments={comments}
                                addComment={(comment) => {
                                    addComment(comment, card.idBoard)
                                }}
                        />
                        </Col>
                        <Col sm="3">
                            <AddChecklist
                                cardId={card.id}
                                boardId={boardId}
                                addChecklist={ (checklist) => {
                                    addChecklist(card.idList, card.id, checklist)
                                }}
                            />
                            <Button color="secondary" onClick={this.toggleArchive} size="sm" block>Archive</Button>
                            <Modal isOpen={this.state.archiveModal} toggle={this.toggleArchive}>
                                <ModalHeader toggle={this.toggleArchive}>Archive the card</ModalHeader>
                                <ModalBody>
                                    Do you want archive the card ?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="warning" onClick={this.closeCard}>Archive</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleArchive}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                            <Button color="danger" onClick={this.toggleDelete} size="sm" block>Delete</Button>
                            <Modal isOpen={this.state.deleteModal} toggle={this.toggleDelete}>
                                <ModalHeader toggle={this.toggleArchive}>Delete the card</ModalHeader>
                                <ModalBody>
                                    Do you want delete the card ?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={this.deleteCardEvent}>Archive</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleDelete}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        )
    }
}

const mapStateToProps = (state, props) => ({
    boardId: (state.board.id) ? state.board.id : state.board._id,
    checklists: state.checklists.filter(checklist => checklist.idCard == props.card.id),
    comments: state.comments.filter(comment => comment.idCard == props.card.id),
    labels: state.labels.filter(label => label.id == state.board.id),
});

const mapDispatchToProps = (dispatch) => ({
    setDueComplete: (idList, idCard, dueComplete) => dispatch(setDueComplete(idList, idCard, dueComplete)),
    deleteCard: (card) =>  dispatch(deleteCard(card)),
    setName: (idList, idCard, name, idBoard) => dispatch(setName(idList, idCard, name, idBoard)),
    setDesc: (idList, idCard, desc, idBoard) => dispatch(setDesc(idList, idCard, desc), idBoard),
    setDue: (idList, idCard, due, idBoard) => dispatch(setDue(idList, idCard, due, idBoard)),
    setClosed: (idList, idCard, closed, idBoard) => dispatch(setClosed(idList, idCard, closed, idBoard)),
    addChecklist: (idCard, checklist, idBoard) => dispatch(addChecklist(idCard, checklist, idBoard)),
    addCheckItem : (idBoard, idCard, idChecklist, checkItem) => dispatch(addCheckItem(idBoard, idCard, idChecklist, checkItem)),
    checkListDelete: (idBoard, idCard, idChecklist) => dispatch(checkListDelete(idBoard, idCard,idChecklist)),
    checkItemDelete :  (idBoard, idCard, idChecklist, idCheckItem) => dispatch(checkItemDelete(idBoard, idCard,idChecklist, idCheckItem)),
    setChecklists: (checklists) => dispatch(setChecklists(checklists)),
    checklistSetName: (idChecklist, checklistName, idBoard, idList, idCard) => dispatch(checklistSetName(idChecklist, checklistName, idBoard, idList, idCard)),
    checklistSetPos: (idChecklist, checklistPos, idBoard, idList, idCard) => dispatch(checklistSetPos(idChecklist, checklistPos, idBoard, idList, idCard)),
    checkItemSetName: (idCheckItem, checkItemName, idBoard, idList, idCard, idChecklist) => dispatch(checkItemSetName(idCheckItem, checkItemName, idBoard, idList, idCard, idChecklist)),
    checkItemSetPos: (idCheckItem, checkItemPos, idBoard, idList, idCard, idChecklist) => dispatch(checkItemSetPos(idCheckItem, checkItemPos, idBoard, idList, idCard, idChecklist)),
    checkItemSetState: (idCheckItem, checkItemState, idBoard, idCard, idChecklist)=> dispatch(checkItemSetState(idCheckItem, checkItemState, idBoard, idCard, idChecklist)),
    setComments: (comments) => dispatch(setComments(comments)),
    addComment: (comment, idBoard) => dispatch(addComment(comment, idBoard)),
    setTextComment: (idComment, text, idBoard) => dispatch(setTextComment(idComment, text, idBoard)),
});

export const CardModal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardModalToBeConnected);
