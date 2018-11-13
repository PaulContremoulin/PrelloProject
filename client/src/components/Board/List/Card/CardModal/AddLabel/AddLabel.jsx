import React from 'react';

// Components & Actions

// Css
import { Row, Button, Form, Input } from 'reactstrap';
import Octicon from 'react-octicon';
import './AddLabel.css'

export class AddLabel extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        labelText: "",
        addLabel: false,
      }
  }

  handleSubmit = ( event ) => {
    event.preventDefault();
    const labelText = this.state.labelText;
    if (labelText !== "") {
      this.props.addLabel(labelText);
      this.setState({ labelText: "" })
      this.toggleAddLabel();
    }
  }

  handleChange = async (event) => {
      const value = event.target.value;
      this.setState({
          labelText: value,
      });
  };

  toggleAddLabel = () => { this.setState({ addLabel: !this.state.addLabel }) }


  render() {
    const { addLabel } = this.props;
    return (
      <Row>
        {(this.state.addLabel) ?
          <Form className="form" onSubmit={this.handleSubmit}>
          <Input
          type="text"
          name="labelText"
          placeholder="Label text"
          required={true}
          onChange={(e) => this.handleChange(e)}
          />
          <Button color="success">Add label</Button>
          <Button outline color="secondary" type="button" onClick={ () => this.toggleAddLabel() }><Octicon name="x"/></Button>
          </Form>
          :
          <Button onClick={ () => this.toggleAddLabel() }>Add label</Button>
        }
      </Row>
    )
  }
}
