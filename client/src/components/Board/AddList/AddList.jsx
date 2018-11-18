import React from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';

// Css
import Octicon from 'react-octicon';
import './AddList.css';

export class AddList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        edited: false,
        listName: ""
      }
  }

  handleSubmit = ( event ) => {
    event.preventDefault();
    const listName = this.state.listName;
    this.props.addList(listName);
    this.setState({ listName: "", edited: false })
  }

  handleChange = async (event) => {
      const value = event.target.value;
      this.setState({
          listName: value,
      });
  };

  handleOnBlur = ( event ) => {
    this.setState({ edited: false });
  }

  toggleEdited = () => {
    this.setState({ edited: !this.state.edited });
  }

  render() {
    return (
      <div className="AddList">
        { (this.state.edited) ?
              <Form className="form" onSubmit={this.handleSubmit}>
                  <InputGroup>
                    <Input
                        type="text"
                        name="listName"
                        placeholder="List name"
                        required={true}
                        onChange={(e) => this.handleChange(e)}
                    />

                      <InputGroupAddon addonType="append"><Button color="success"><Octicon name="plus"/></Button></InputGroupAddon>
                      <InputGroupAddon addonType="append"><Button outline color="secondary" type="button" onClick={ () => this.toggleEdited() }><Octicon name="x"/></Button></InputGroupAddon>
                  </InputGroup>


              </Form>
          :
          <Button onClick={() => this.toggleEdited() } block>Add a list</Button>
        }
      </div>
    )
  }
}
