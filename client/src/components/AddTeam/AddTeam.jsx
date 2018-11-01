// Modules
import React from 'react';
import { connect } from "react-redux";
import Popup from "reactjs-popup";

// Css
import {Button, Row, Col, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

// Actions & Constant


export class AddTeam extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'open': false,
            'alertVisible': false,
            'name': '',
        }
        const { addTeam, addTeamToDB } = this.props;
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
        this.addTeamToDB(this.state.name)
         .then(res => {
                this.addTeam(res.data.teamId, this.state.name)
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
                      <h2 align="center">Add a team</h2>
                      <Alert color="info" isOpen={this.state.visible} toggle={ () => onDismiss() }>
                          There was an error. The team could not be created.
                      </Alert>
                      <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                          <Row>
                              <Col sm="12" md="6">
                                  <FormGroup>
                                      <Input
                                          type="text"
                                          name="teamName"
                                          placeholder="Team's name"
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
                                  <Button type="submit">Add a team</Button>
                              </Col>
                          </Row>
                      </Form>
                  </Col>
              </Popup>
          </div>
        )
    }
}
