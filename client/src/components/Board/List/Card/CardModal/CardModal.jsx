// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Modal,ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

// Css
import './CardModal.css';

// Actions & Constant
import { setName, setDesc, setDue, setClosed } from '../../../../../actions/cardActions';
import { changeCardName, changeCardDueDate, changeCardDesc, changeCardClosed } from '../../../../../requests/cards';

export class CardModalToBeConnected extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        openInputHeader: false,
        descInput: false,
        dueDateInput: false,
      }
  }

// cardId : ID
// cardName : String
// index : Int
// associatedMembers : [ userId ]
// deadline (due Date) : date
// checklists : [ Checklist ]
// comments : [ Comment ]

  handleOnBlurHeader = (event) => {
    const newName = event.target.value;
    if (newName !== this.props.card.name) {
      changeCardName(this.props.card.id, newName )
      .then( () => this.props.setName( this.props.listId, this.props.card.id, newName ) )
    }
    this.setState({ openInputHeader: false })
  }

  handleOnBlurDesc = (event) => {
    const newDesc = event.target.value;
    if (newDesc !== this.props.card.desc) {
      changeCardDesc(this.props.card.id, newDesc )
      .then( () => this.props.setDesc( this.props.listId, this.props.card.id, newDesc ) )
    }
    this.setState({ descInput: false })
  }

  handleOnBlurDueDate = (event) => {
    const newDate = event.target.value;
    if (newDate !== this.props.card.due) {
      changeCardDueDate(this.props.card.id, newDate )
      .then( () => this.props.setDue( this.props.listId, this.props.card.id, newDate ) )
    }
    this.setState({ dueDateInput: false })
  }

  toggleInputHeader = () => {
    this.setState({ openInputHeader: true })
  }

  toggleDescInput = () => {
    this.setState({ descInput : true })
  }

  toggleDueInput = () => {
    this.setState({ dueDateInput : !this.state.dueDateInput })
  }

  render() {
    const { openInputHeader } = this.state;
      const {
        card,
        open,
        listId,
        closeModal,
      } = this.props;
      return (
          <div>
            <Modal className="modal-lg" isOpen={open} toggle={() => closeModal() } centered={true}>
              <ModalHeader className="cardModalHeader" toggle={() => closeModal()}>
              {(openInputHeader) ?
                <Input
                  type="text"
                  name="cardName"
                  placeholder="Card name"
                  required={true}
                  defaultValue={card.name}
                  onBlur={(e) => this.handleOnBlurHeader(e)}
                />
                :
                <span onClick={ () => this.toggleInputHeader() } >{card.name}</span>
              }
              </ModalHeader>
              <ModalBody className="cardModalBody">
                <Row className="MainModalRow">
                  {(card.due !== null && !this.state.dueDateInput) ? <h6>Due Date : {card.due}</h6> : null}
                  {(this.state.dueDateInput) ?
                    <div>
                      <Label for="dueDate">Due date :</Label>
                      <Input
                      type="date"
                      name="dueDate"
                      id="dueDate"
                      placeholder="date placeholder"
                      onBlur={ (e) => this.handleOnBlurDueDate(e) }
                      />
                    </div>
                    :
                    null
                  }
                </Row>
                <Row>
                  <Col className="SideModalCol" md="3">
                    <Row className="SideModalRow">
                      <Button color="secondary" onClick={ () => this.toggleDueInput() }>Deadline</Button>
                    </Row>
                    <Row className="SideModalRow">
                      <Button color="secondary">Add checkbox</Button>
                    </Row>
                    <Row className="SideModalRow">
                      <Button color="secondary">Archive</Button>
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
                          type="text"
                          name="desc"
                          placeholder="description for your card"
                          required={true}
                          defaultValue={card.desc}
                          onBlur={(e) => this.handleOnBlurDesc(e)}
                        />
                        :
                        <p onClick={ () => this.toggleDescInput()}>{card.desc}</p>
                      }
                    </Row>
                    <Row className="MainModalRow">
                      <h4>Members : </h4>
                    </Row>
                    <Row className="MainModalRow">
                      <h4>Add a comment : </h4>
                    </Row>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                  <Button color="secondary" onClick={() => closeModal() }>Return</Button>
              </ModalFooter>
            </Modal>
          </div>
      )
  }
}

const mapStateToProps = ( state, props ) => ({

})

const mapDispatchToProps = ( dispatch ) => ({
  setName: (idList, idCard, name) => dispatch( setName(idList, idCard, name) ),
  setDesc: (idList, idCard, desc) => dispatch( setDesc(idList, idCard, desc) ),
  setDue: (idList, idCard, due) => dispatch( setDue(idList, idCard, due) ),
  setClosed: (idList, idCard, closed) => dispatch( setClosed(idList, idCard, closed) ),
})

export const CardModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)( CardModalToBeConnected );
