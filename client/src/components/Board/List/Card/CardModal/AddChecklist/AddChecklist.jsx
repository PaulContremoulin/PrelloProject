import React from 'react';

// Components & Actions

// Css
import { Row, Button, Form, Input } from 'reactstrap';
import Octicon from 'react-octicon';
import './AddChecklist.css'

export class AddChecklist extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        checklistName: ""
      }
  }

  handleSubmit = ( event ) => {
    event.preventDefault();
    const checklistName = this.state.checklistName;
    if (checklistName !== "") {
      this.props.addChecklist(checklistName);
      this.setState({ checklistName: "" })
      this.props.toggleEditedChecklist();
    }
  }

  handleChange = async (event) => {
      const value = event.target.value;
      this.setState({
          checklistName: value,
      });
  };


  render() {
    const { toggleEditedChecklist, addChecklist } = this.props;
    return (
      <Row>
        <Form className="form" onSubmit={this.handleSubmit}>
          <Input
              type="text"
              name="checklistName"
              placeholder="Checklist name"
              required={true}
              onChange={(e) => this.handleChange(e)}
          />
          <Button color="success">Add checklist</Button>
          <Button outline color="secondary" type="button" onClick={ () => toggleEditedChecklist() }><Octicon name="x"/></Button>
        </Form>
      </Row>
    )
  }
}
