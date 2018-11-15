// Modules
import React from 'react';
import {connect} from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Badge,
    Popover,
    PopoverHeader,
    PopoverBody
} from 'reactstrap';

// Css
import './CardModal.css';

// Actions & Constant
import {AddChecklist} from './AddChecklist/AddChecklist';
import {Checklist} from './Checklist/Checklist';
import {Comment} from './Comment/Comment';
import {AddComment} from './AddComment/AddComment';
import {LabelComponent} from './Label/Label';
import {AddLabel} from './AddLabel/AddLabel';
import {setName, setDesc, setDue, setClosed, addChecklist, setChecklists} from '../../../../../actions/cardActions';
import {changeCardName, changeCardDueDate, changeCardDesc, changeCardClosed} from '../../../../../requests/cards';
import {checklistSetName, checklistSetPos, checkItemSetName, checkItemSetPos, checkItemSetState} from '../../../../../actions/checkObjectActions';
import {postChecklistToCard, getChecklists} from '../../../../../requests/checklists';
import {setComments, addComment, setTextComment} from '../../../../../actions/commentActions';
import {getComments, postCommentToCard, putTextToComment} from '../../../../../requests/comments';
import {setLabels, addLabel, setNameLabel, setColorLabel, deleteLabelFromBoard} from '../../../../../actions/labelActions';
import {getLabel, postLabel, putLabel, deleteLabel, removeLabelFromCard, postLabelToCard} from '../../../../../requests/labels';

import {TitleCard} from "./TitleCard/TitleCard";
import {DateCalendar} from "./DateCalendar/DateCalendar";
import {DescCard} from "./DescCard/DescCard";
import {ChecklistsCard} from "./ChecklistsCard/ChecklistsCard";

export class CardModalToBeConnected extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openInputHeader: false,
            descInput: false,
            dueDateInput: false,
            addChecklist: false,
            openTags: false,
        }
    }

    componentDidMount() {
        const cardId = (this.props.card.id != undefined) ? this.props.card.id : this.props.card._id;
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

// cardId : ID
// cardName : String
// index : Int
// associatedMembers : [ userId ]
// deadline (due Date) : date
// checklists : [ Checklist ]
// comments : [ Comment ]




    closeCard = () => {
        const cardId = (this.props.card.id != undefined) ? this.props.card.id : this.props.card._id;
        changeCardClosed(cardId, true)
            .then(() => this.props.setClosed(this.props.listId, cardId, true))
    }

    // CHECKLISTS
    toggleEditedChecklist = () => {
        this.setState({addChecklist: !this.state.addChecklist});
    }

    addChecklistToCard = (checklistName) => {
        const cardId = (this.props.card.id != undefined) ? this.props.card.id : this.props.card._id;
        const boardId = this.props.boardId;
        postChecklistToCard(checklistName, cardId, boardId)
            .then(checklist => this.props.addChecklist(this.props.listId, cardId, checklist.data))
    }

    // COMMENTS
    addCommentToCard = (commentText) => {
        const cardId = (this.props.card.id != undefined) ? this.props.card.id : this.props.card._id;
        const boardId = this.props.boardId;
        postCommentToCard(commentText, cardId)
            .then(comment => this.props.addComment(comment.data, boardId))
    }
    // Tags
    toggleTags = () => {
        this.setState({openTags: !this.state.openTags})
    }

    render() {
        const {openInputHeader, openTags} = this.state;
        const {
            card,
            boardId, checklists, comments, labels,
            open,
            listId,
            closeModal,
            setDue, setName, setDesc,
            setComments, addComment, setTextComment,
            addChecklist,
            checklistSetName, checklistSetPos,
            checkItemSetName, checkItemSetPos, checkItemSetState,
        } = this.props;
        return (
            <Modal className="cardModal" isOpen={open} toggle={() => closeModal()} centered={true}>
                <ModalHeader className="cardModalHeader" toggle={() => closeModal()}>
                    <TitleCard
                        cardId={card.id}
                        name={card.name}
                        setName={(name) => {
                            setName(listId, card.id, name)
                        }}
                    />
                    <DateCalendar
                        cardId={card.id}
                        setDue={(due) => {
                            setDue(listId, card.id, due)
                        }}
                        due={card.due}
                    />
                </ModalHeader>
                <ModalBody>
                    <DescCard
                        cardId={card.id}
                        setDesc={(desc) => {
                            setDesc(listId, card.id, desc)
                        }}
                        desc={card.desc}
                    />
                    <ChecklistsCard
                        checklists={checklists}
                        checklistSetName={checklistSetName}
                        checklistSetPos={checklistSetPos}
                        checkItemSetName={checkItemSetName}
                        checkItemSetPos={checkItemSetPos}
                        checkItemSetState={checkItemSetState}
                    />

                </ModalBody>
            </Modal>
        )
    }
}

const mapStateToProps = (state, props) => ({
    boardId: (state.board.id) ? state.board.id : state.board._id,
    checklists: state.checklists.filter(checklist => checklist.idCard == props.card.id),
    comments: state.comments.filter(comment => comment.idCard == props.card.id),
    labels: state.labels.filter(label => label.id == state.board.id)
})

const mapDispatchToProps = (dispatch) => ({
    setName: (idList, idCard, name) => dispatch(setName(idList, idCard, name)),
    setDesc: (idList, idCard, desc) => dispatch(setDesc(idList, idCard, desc)),
    setDue: (idList, idCard, due) => dispatch(setDue(idList, idCard, due)),
    setClosed: (idList, idCard, closed) => dispatch(setClosed(idList, idCard, closed)),
    addChecklist: (checklistName, idCard, idBoard) => dispatch(addChecklist(checklistName, idCard, idBoard)),
    setChecklists: (checklists) => dispatch(setChecklists(checklists)),
    checklistSetName: (idChecklist, checklistName, idBoard, idList, idCard) => dispatch(checklistSetName(idChecklist, checklistName, idBoard, idList, idCard)),
    checklistSetPos: (idChecklist, checklistPos, idBoard, idList, idCard) => dispatch(checklistSetPos(idChecklist, checklistPos, idBoard, idList, idCard)),
    checkItemSetName: (idCheckItem, checkItemName, idBoard, idList, idCard, idChecklist) => dispatch(checkItemSetName(idCheckItem, checkItemName, idBoard, idList, idCard, idChecklist)),
    checkItemSetPos: (idCheckItem, checkItemPos, idBoard, idList, idCard, idChecklist) => dispatch(checkItemSetPos(idCheckItem, checkItemPos, idBoard, idList, idCard, idChecklist)),
    checkItemSetState: (idCheckItem, checkItemState, idBoard, idList, idCard, idChecklist) => dispatch(checkItemSetState(idCheckItem, checkItemState, idBoard, idList, idCard, idChecklist)),
    setComments: (comments) => dispatch(setComments(comments)),
    addComment: (comment, idBoard) => dispatch(addComment(comment, idBoard)),
    setTextComment: (idComment, text, idBoard) => dispatch(setTextComment(idComment, text, idBoard)),
})

export const CardModal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardModalToBeConnected);
