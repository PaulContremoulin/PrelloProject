// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Modal,ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

// Css
import './CardModal.css';

// Actions & Constant
import { setName } from '../../../../../actions/cardActions';

export class CardModalToBeConnected extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        openInputHeader: false
      }
  }

// cardId : ID
// cardName : String
// index : Int
// associatedMembers : [ userId ]
// deadline (due Date) : date
// checklists : [ Checklist ]
// comments : [ Comment ]

  handleOnBlur = (event) => {
    const newName = event.target.value;
    if (newName !== this.props.card.name) {
      this.props.setName( 1, 1, newName ); // Todo
    }
    this.setState({ openInputHeader: false })
  }

  toggleInputHeader = () => {
    this.setState({ openInputHeader: true })
  }

  render() {
    const { openInputHeader } = this.state;
      const {
        card,
        open,
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
                  onBlur={(e) => this.handleOnBlur(e)}
                />
                :
                <span onClick={ () => this.toggleInputHeader() } >{card.name}</span>
              }
              </ModalHeader>
              <ModalBody className="cardModalBody">
                <Row className="MainModalRow">
                  <h6>Deadline : </h6>
                </Row>
                <Row>
                  <Col className="SideModalCol" md="4">
                    <Row className="SideModalRow">
                      <Button color="secondary">Deadline</Button>
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
                      <h4>Tags : </h4>
                    </Row>
                    <Row className="MainModalRow">
                      <h4>Members : </h4>
                    </Row>
                    <Row className="MainModalRow">
                      <h4>Description : {card.desc}</h4>
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
})

export const CardModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)( CardModalToBeConnected );
