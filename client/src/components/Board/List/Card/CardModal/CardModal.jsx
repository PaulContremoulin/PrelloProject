// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Modal,ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input, Alert, Badge, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import Calendar from 'react-calendar';
// Css
import './CardModal.css';

// Actions & Constant
import { AddChecklist } from './AddChecklist/AddChecklist';
import { Checklist } from './Checklist/Checklist';
import { Comment } from './Comment/Comment';
import { AddComment } from './AddComment/AddComment';
import { LabelComponent } from './Label/Label';
import { AddLabel } from './AddLabel/AddLabel';
import { setName, setDesc, setDue, setClosed, addChecklist, setChecklists } from '../../../../../actions/cardActions';
import { changeCardName, changeCardDueDate, changeCardDesc, changeCardClosed } from '../../../../../requests/cards';
import { checklistSetName, checklistSetPos, checkItemSetName, checkItemSetPos, checkItemSetState } from '../../../../../actions/checkObjectActions';
import { postChecklistToCard, getChecklists } from '../../../../../requests/checklists';
import { setComments, addComment, setTextComment } from '../../../../../actions/commentActions';
import { getComments, postCommentToCard, putTextToComment } from '../../../../../requests/comments';
import { setLabels, addLabel, setNameLabel, setColorLabel, deleteLabelFromBoard } from '../../../../../actions/labelActions';
import { getLabel, postLabel, putLabel, deleteLabel, removeLabelFromCard, postLabelToCard } from '../../../../../requests/labels';

import  dateFormat from 'dateformat';

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
    const cardId = this.props.card.id;
    getChecklists(cardId)
      .then(res => {
        this.props.setChecklists(res.data);
      })
        .catch(error => {console.log(error)});
    getComments(cardId)
      .then(res => {
        this.props.setComments(res.data);
      })
        .catch(error => {console.log(error)});
  }

  handleOnBlurHeader = (event) => {
    const newName = event.target.value;
    if (newName !== this.props.card.name) {
      const cardId = this.props.card.id;
      changeCardName(cardId, newName )
      .then( () => this.props.setName( this.props.listId, cardId, newName ) )
    }
    this.setState({ openInputHeader: false })
  }

  handleOnBlurDesc = (event) => {
    const newDesc = event.target.value;
    if (newDesc !== this.props.card.desc) {
      const cardId = this.props.card.id;
      changeCardDesc(cardId, newDesc )
      .then( () => this.props.setDesc( this.props.listId, cardId, newDesc ) )
    }
    this.setState({ descInput: false })
  }

  handleOnChangeDueDate = (date) => {
    const newDate = date;
    if (newDate !== this.props.card.due) {
      const cardId = this.props.card.id;
      changeCardDueDate(cardId, newDate )
      .then( () => this.props.setDue( this.props.listId, cardId, newDate ) )
    }
    this.setState({ dueDateInput: false })
  }

  toggleInputHeader = () => this.setState({ openInputHeader: true });

  toggleDescInput = () => { this.setState({ descInput : true }) }

  toggleDueInput = () => { this.setState({ dueDateInput : !this.state.dueDateInput }) }

  closeCard = () => {
    const cardId = this.props.card.id;
    changeCardClosed(cardId, true)
    .then( () => this.props.setClosed( this.props.listId, cardId, true) )
  }

  // CHECKLISTS
  toggleEditedChecklist = () => { this.setState({ addChecklist: !this.state.addChecklist }); }

  addChecklistToCard = (checklistName) => {
    const cardId = this.props.card.id;
    const boardId = this.props.boardId;
    postChecklistToCard(checklistName, cardId, boardId)
    .then( checklist => {
      this.props.addChecklist(checklist.data, boardId)
    } )
  }

  // COMMENTS
  addCommentToCard = (commentText) => {
    const cardId = this.props.card.id;
    const boardId = this.props.boardId;
    postCommentToCard(commentText, cardId)
    .then( comment => this.props.addComment(comment.data, boardId) )
  }
  // Tags
  toggleTags = () => {
    this.setState({ openTags: !this.state.openTags })
  }

  render() {
    const { openInputHeader, openTags } = this.state;
      const {
        card,
        boardId, checklists, comments, labels,
        open,
        listId,
        closeModal,
        setComments, addComment, setTextComment,
        addChecklist,
        checklistSetName, checklistSetPos,
        checkItemSetName, checkItemSetPos, checkItemSetState,
      } = this.props;
      console.log(checklists);
      return (
          <Modal isOpen={open} toggle={() => closeModal() } centered={true}>
              <ModalHeader className="cardModalHeader" toggle={() => closeModal()}>
                <Col>
                  {(openInputHeader) ?
                      <h4>
                      <Input
                          type="text"
                          name="cardName"
                          placeholder="Card name"
                          autoFocus
                          required={true}
                          defaultValue={card.name}
                          onBlur={(e) => this.handleOnBlurHeader(e)}
                      />
                      </h4>
                      :
                      <h4 onClick={ () => this.toggleInputHeader() } >{card.name}</h4>
                  }
                </Col>
                <Row>
                  <Col className="SideModalCol" md="3">
                    <Row className="SideModalRow">
                      <Button color="secondary" onClick={ () => this.toggleDueInput() }>Deadline</Button>
                    </Row>
                    <Row className="SideModalRow">
                      <Button color="secondary" onClick={ () => this.toggleEditedChecklist() }>Add checklist</Button>
                    </Row>
                    <Row className="SideModalRow">
                      <Button color="secondary" onClick={ () => this.toggleTags() }>Tags</Button>
                    </Row>
                    <Row className="SideModalRow">
                      <Button color="secondary" onClick={ () => this.closeCard() }>Archive</Button>
                    </Row>
                    <Row className="SideModalRow">
                      <Button color="danger">Delete</Button>
                    </Row>
                  </Col>
                  <Col md="8" className="MainModalCol">
                    <Row className="MainModalRow">
                      <h4>Description :  </h4>
                      {( this.state.descInput || (card.desc === "")) ?
                        <Input
                          type="textarea"
                          name="desc"
                          placeholder="description for your card"
                          defaultValue={card.desc}
                          onBlur={(e) => this.handleOnBlurDesc(e)}
                        />
                        :
                        <p onClick={ () => this.toggleDescInput()}>{card.desc}</p>
                      }
                    </Row>
                    {(openTags) ?
                      <Row className="MainModalRow">
                        <h4>Tags : </h4>
                        {labels.map(
                          (label, index) => <LabelComponent label={label} key={index} />
                        )}
                      </Row>
                      :
                      null
                    }
                    <Row className="MainModalRow">
                      <h4>Members : </h4>
                    </Row>
                    {
                      (checklists) ?
                        <div>
                          <Row className="MainModalRow">
                            <h4>Checklist : </h4>
                          </Row>
                          <Row className="MainModalRow">
                            <Col>
                            {checklists.map(
                              (checklist, index) =>
                              <Checklist checklist={checklist} key={index}
                                checklistSetName={checklistSetName}
                                checklistSetPos={checklistSetPos}
                                checkItemSetName={checkItemSetName}
                                checkItemSetPos={checkItemSetPos}
                                checkItemSetState={checkItemSetState}
                              />
                            )}
                            </Col>
                          </Row>
                        </div>
                        :
                        null
                    }
                    {(this.state.addChecklist) ?
                      <AddChecklist
                        toggleEditedChecklist={ () => this.toggleEditedChecklist() }
                        addChecklist={ (checklistName) => this.addChecklistToCard(checklistName) }
                      />
                      : null
                    }
                  </Col>
                </Row>
                  <Row>
                    <Col>
                        {
                          (card.due !== null && card.due !== '')
                          ?
                          <h6 id="dueDateId" onClick={ () => this.toggleDueInput() }>For : <Badge color="primary"> { dateFormat(card.due, "fullDate") } </Badge></h6>
                          :
                          <h6 id="dueDateId" onClick={ () => this.toggleDueInput() }>No due date</h6>
                        }
                        <Row className="MainModalRow">
                          <h4>Comments : </h4>
                          { // Bugged,
                          (comments) ?
                            <div>
                              {comments.map(
                                (comment, index) => <Comment key={index} comment={comment} />
                              )}
                            </div>
                            :
                            null
                          }
                          <AddComment
                            addComment={ (checklistName) => { this.addCommentToCard(checklistName) } }
                          />
                        </Row>
                  </Col>
                </Row>
                <Popover placement="bottom" isOpen={this.state.dueDateInput} target="dueDateId" toggle={this.state.dueDateInput}>
                    <PopoverHeader>Due date</PopoverHeader>
                    <PopoverBody>
                        <Calendar
                            value={ card.due ? new Date(card.due) : new Date()}
                            onChange={ (date) => this.handleOnChangeDueDate(date)}
                            onBlur={(e) => this.toggleDueInput()}
                        />
                    </PopoverBody>
                </Popover>
              </ModalHeader>
          </Modal>
      )
  }
}

const mapStateToProps = ( state, props ) => ({
  boardId: (state.board.id) ? state.board.id : state.board._id,
  checklists: state.checklists.filter( checklist => checklist.idCard == props.card.id),
  comments: state.comments.filter( comment => comment.idCard == props.card.id),
  labels: state.labels.filter( label => label.id == state.board.id )
})

const mapDispatchToProps = ( dispatch ) => ({
  setName: (idList, idCard, name, idBoard) => dispatch( setName(idList, idCard, name, idBoard) ),
  setDesc: (idList, idCard, desc, idBoard) => dispatch( setDesc(idList, idCard, desc, idBoard) ),
  setDue: (idList, idCard, due, idBoard) => dispatch( setDue(idList, idCard, due, idBoard) ),
  setClosed: (idList, idCard, closed, idBoard) => dispatch( setClosed(idList, idCard, closed, idBoard) ),
  addChecklist: (checklist, idBoard) => dispatch( addChecklist(checklist, idBoard) ),
  setChecklists: (checklists) => dispatch( setChecklists(checklists) ),
  checklistSetName: (idChecklist, checklistName, idBoard, idList, idCard) => dispatch( checklistSetName(idChecklist, checklistName, idBoard, idList, idCard) ),
  checklistSetPos: (idChecklist, checklistPos, idBoard, idList, idCard) => dispatch( checklistSetPos(idChecklist, checklistPos, idBoard, idList, idCard) ),
  checkItemSetName: (idCheckItem, checkItemName, idBoard, idList, idCard, idChecklist) => dispatch( checkItemSetName(idCheckItem, checkItemName, idBoard, idList, idCard, idChecklist) ),
  checkItemSetPos: (idCheckItem, checkItemPos, idBoard, idList, idCard, idChecklist) => dispatch( checkItemSetPos(idCheckItem, checkItemPos, idBoard, idList, idCard, idChecklist) ),
  checkItemSetState: (idCheckItem, checkItemState, idBoard, idList, idCard, idChecklist) => dispatch( checkItemSetState(idCheckItem, checkItemState, idBoard, idList, idCard, idChecklist) ),
  setComments: (comments) => dispatch( setComments(comments) ),
  addComment: (comment, idBoard) => dispatch( addComment(comment, idBoard) ),
  setTextComment: (idComment, text, idBoard) => dispatch( setTextComment(idComment, text, idBoard) ),
})

export const CardModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)( CardModalToBeConnected );
