import React from 'react';

// Components & Actions

// Css
import { Card, Button, CardBody, CardTitle, Form, Input } from 'reactstrap';
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
      <Card className="AddList">
        <CardBody>
        { (this.state.edited) ?
            <CardTitle>
              <Form className="form" onSubmit={this.handleSubmit}>
                <Input
                    type="text"
                    name="listName"
                    placeholder="List name"
                    required={true}
                    onChange={(e) => this.handleChange(e)}
                />
                <Button color="success">Add a list</Button>
                <Button outline color="secondary" type="button" onClick={ () => this.toggleEdited() }><Octicon name="x"/></Button>
              </Form>
            </CardTitle>
          :
          <CardTitle><Button onClick={() => this.toggleEdited() }>Add a list</Button></CardTitle>
        }
        </CardBody>
      </Card>
    )
  }
}
