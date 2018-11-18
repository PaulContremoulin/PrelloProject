// Modules
import React from 'react';
import {connect} from 'react-redux';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col} from 'reactstrap';
import {faTrashAlt, faArchive} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Css
import './CardModal.css';

// Actions & Constant
import {AddChecklist} from './AddChecklist/AddChecklist';
import {AddTag} from './AddTag/AddTag';

import {TitleCard} from "./TitleCard/TitleCard";
import {DateCalendar} from "./DateCalendar/DateCalendar";
import {Tags} from "./Tags/Tags";
import {DescCard} from "./DescCard/DescCard";
import {ChecklistsCard} from "./ChecklistsCard/ChecklistsCard";
import {CommentsCard} from "./CommentsCard/CommentsCard";

import { changeCardClosed, deleteCardRequest} from '../../../../../requests/cards';
import { getChecklists} from '../../../../../requests/checklists';
import {getComments} from '../../../../../requests/comments';

import {
    checklistSetName,
    checklistSetPos,
    checkItemSetName,
    checkItemSetPos,
    checkItemSetState,
    checkListDelete,
    checkItemDelete,
    addCheckItem} from '../../../../../actions/checkObjectActions';
import {setName, setDesc, setDue, setClosed, addChecklist, setChecklists, setDueComplete, addLabelCard, deleteLabelCard, addMemberCard, deleteMemberCard} from '../../../../../actions/cardActions';
import {setComments, addComment, setTextComment} from '../../../../../actions/commentActions';
import {setLabels, addLabel, setNameLabel, setColorLabel, deleteLabelFromBoard} from '../../../../../actions/labelActions';
import {deleteCard} from "../../../../../actions/boardActions";
import {AddMember} from "./AddMember/AddMember";
import {MembersCard} from "./MembersCard/MembersCard";


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
            boardId,
            checklists,
            comments,
            labels,
            checkListDelete,
            addCheckItem,
            open,
            listId,
            closeModal,
            setDue,
            setName,
            setDesc,
            setComments,
            addComment,
            setTextComment,
            addChecklist,
            checklistSetName,
            checklistSetPos,
            checkItemSetName,
            checkItemSetPos,
            checkItemSetState,
            setDueComplete,
            checkItemDelete,
            labelsCard,
            addLabel,
            addLabelCard,
            deleteLabelCard,
            membersBoard,
            membersCard,
            deleteMemberCard,
            addMemberCard
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
                    <Tags
                        labelsCard={labelsCard}
                    />
                    <MembersCard
                        membersCard={membersCard}
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
                            <AddMember
                                memberships={membersBoard}
                                membersCard={membersCard}
                                cardId={card.id}
                                idMembers={card.idMembers}
                                addMemberCard={(idMember) => {
                                    addMemberCard(card.id, idMember, card.idList, boardId)
                                }}
                                deleteMemberCard={ (idMember) => {
                                    deleteMemberCard(card.id, idMember, card.idList, boardId)
                                }}
                                />
                            <AddTag
                                labelsBoard={labels}
                                labelsCard={card.idLabels}
                                cardId={card.id}
                                boardId={boardId}
                                addLabelCard={ (idLabel) => {
                                    addLabelCard(card.id, idLabel, card.idList, boardId)
                                }}
                                deleteLabelCard={ (idLabel) => {
                                    deleteLabelCard(card.id, idLabel, card.idList, boardId)
                                }}
                                addLabel={ (label) => {
                                    addLabel(label, boardId)
                                }}
                            />
                            <AddChecklist
                                cardId={card.id}
                                boardId={boardId}
                                addChecklist={ (checklist) => {
                                    addChecklist(card.id, checklist, boardId)
                                }}
                            />
                            <Button color="secondary" onClick={this.toggleArchive} size="sm" block><FontAwesomeIcon className='iconBefore' icon={faArchive}/>Archive</Button>
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
                            <Button color="danger" onClick={this.toggleDelete} size="sm" block><FontAwesomeIcon className='iconBefore' icon={faTrashAlt}/>Delete</Button>
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

const mapStateToProps = (state, props) => {
    const labelsBoard = state.labels;
    return({
        boardId: (state.board.id) ? state.board.id : state.board._id,
        checklists: state.checklists.filter(checklist => checklist.idCard == props.card.id),
        comments: state.comments.filter(comment => comment.idCard == props.card.id),
        labels: labelsBoard, //state.labels.filter(label => label.id == state.board.id),
        labelsCard: labelsBoard.filter(
            label => props.card.idLabels.includes(label.id)
        ),
        membersBoard: state.board.memberships,
        membersCard: state.board.memberships.filter(
            member => props.card.idMembers.includes(member.id)
        ),
    })
};

const mapDispatchToProps = (dispatch) => ({
    addMemberCard : (idCard, idMember, idList, idBoard) => dispatch(addMemberCard(idCard, idMember, idList, idBoard)),
    deleteMemberCard : (idCard, idMember, idList, idBoard) => dispatch(deleteMemberCard(idCard, idMember, idList, idBoard)),
    addLabel: (label, idBoard) => dispatch(addLabel(label, idBoard)),
    deleteLabelCard: (idCard, idLabel, idList, idBoard) => dispatch(deleteLabelCard(idCard, idLabel, idList, idBoard)),
    setDueComplete: (idList, idCard, dueComplete) => dispatch(setDueComplete(idList, idCard, dueComplete)),
    addLabelCard : (idCard, idLabel, idList, idBoard) => dispatch(addLabelCard(idCard, idLabel, idList, idBoard)),
    deleteCard: (card) =>  dispatch(deleteCard(card)),
    setName: (idList, idCard, name, idBoard) => dispatch(setName(idList, idCard, name, idBoard)),
    setDesc: (idList, idCard, desc, idBoard) => dispatch(setDesc(idList, idCard, desc), idBoard),
    setDue: (idList, idCard, due, idBoard) => dispatch(setDue(idList, idCard, due, idBoard)),
    setClosed: (idList, idCard, closed, idBoard) => dispatch(setClosed(idList, idCard, closed, idBoard)),
    addChecklist: (idCard, checklist, idBoard) => dispatch(addChecklist(idCard, checklist, idBoard)),
    addCheckItem : (idBoard, idCard, idChecklist, checkItem) => dispatch(addCheckItem(idBoard, idCard, idChecklist, checkItem)),
    checkListDelete: (idBoard, idCard, idChecklist) => dispatch(checkListDelete(idBoard, idCard,idChecklist)),
    checkItemDelete : (idBoard, idCard, idChecklist, idCheckItem) => dispatch(checkItemDelete(idBoard, idCard,idChecklist, idCheckItem)),
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
