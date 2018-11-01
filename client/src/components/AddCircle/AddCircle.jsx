// Modules
import React from 'react';
import { connect } from "react-redux";
import Popup from "reactjs-popup";

// Css
import {Button, Row, Col, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

// Actions & Constant


export class AddCircle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'open': false,
            'alertVisible': false,
            'name': '',
        }
        const { addCircle, addCircleToDB } = this.props;
    }

    openModal (){
        this.setState({ open: true })
    }

    closeModal () {
        this.setState({
            open: false,
            'name':'',
            'color':'',
        })
    }

    submitForm(e) {
        e.preventDefault();
        this.addCircleToDB(this.state.name)
         .then(res => {
                this.addCircle(res.data.circleId, this.state.name)
                this.closeModal()
         })
         .catch(
             this.setState({
                 alertVisible: true,
                 'name':''
             })
         )
    };

    handleOnBlur = ( event ) => {
      this.setState({ name: event.target.value });
    }

    onDismiss = () => {
        this.setState({
            alertVisible: false
        });
    };

    render() {
        const { name, color } = this.state;
        return (
            <div>
              <Button color="primary"  onClick={ () => openModal() }>+</Button>
              <Popup
                  open={this.state.open}
                  closeOnDocumentClick
                  onClose={ () => closeModal() }
              >
                  <Col>
                      <h2 align="center">Add a circle</h2>
                      <Alert color="info" isOpen={this.state.visible} toggle={ () => onDismiss() }>
                          There was an error. The circle could not be created.
                      </Alert>
                      <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                          <Row>
                              <Col sm="12" md="6">
                                  <FormGroup>
                                      <Input
                                          type="text"
                                          name="circleName"
                                          placeholder="Circle's name"
                                          required={true}
                                          onBlur={( event ) => this.handleOnBlur( event )}
                                      />
                                  </FormGroup>
                              </Col>
                          </Row>
                          <Row className="text-center">
                              <Col>
                                  <Button onClick={ () => closeModal() }>Return</Button>
                              </Col>
                              <Col className="text-center">
                                  <Button type="submit">Add a circle</Button>
                              </Col>
                          </Row>
                      </Form>
                  </Col>
              </Popup>
          </div>
        )
    }
}
