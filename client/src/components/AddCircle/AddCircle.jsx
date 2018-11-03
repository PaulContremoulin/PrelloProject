// Modules
import React from 'react';
import Popup from "reactjs-popup";

// Css
import {Button, Row, Col, Form, FormGroup, Input, Alert} from 'reactstrap';

// Actions & Constant


export class AddCircle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'open': false,
            'alertVisible': false,
            'name': '',
        }
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
        this.props.addCircleToDB(this.state.name)
         .then(res => {
                this.props.addCircle(res.data.circleId, this.state.name)
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
        return (
            <div>
              <Button color="primary"  onClick={ () => this.openModal() }>+</Button>
              <Popup
                  open={this.state.open}
                  closeOnDocumentClick
                  onClose={ () => this.closeModal() }
              >
                  <Col>
                      <h2 align="center">Add a circle</h2>
                      <Alert color="info" isOpen={this.state.visible} toggle={ () => this.onDismiss() }>
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
                                  <Button onClick={ () => this.closeModal() }>Return</Button>
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