// Modules
import React from 'react';
import {Modal,ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

// Css
import './CardModal.css';

// Actions & Constant

export class CardModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

//     cardId : ID
// cardName : String
// index : Int
// associatedMembers : [ userId ]
// deadline (due Date) : date
// checklists : [ Checklist ]
// comments : [ Comment ]

    render() {
        const { card, open, openModal, closeModal } = this.props;
        return (
            <div>
              <Modal isOpen={open} toggle={() =>closeModal() } centered={true}>
                <ModalHeader toggle={() =>closeModal()}>{card.cardName}</ModalHeader>
                <ModalBody>
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
                    <Col md="8">
                      <Row>
                        <h6>Deadline : </h6>
                      </Row>
                      <Row>
                        <h4>Tags : </h4>
                      </Row>
                      <Row>
                        <h4>Members : </h4>
                      </Row>
                      <Row>
                        <h4>Description : </h4>
                      </Row>
                      <Row>
                        <h4>Add a comment : </h4>
                      </Row>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() =>closeModal() }>Return</Button>
                </ModalFooter>
              </Modal>
            </div>
        )
    }
}
