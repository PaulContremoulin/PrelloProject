import React from 'react';

// Components & Actions

// Css
import { Row, Card, Button, CardBody, CardTitle, Form, Input, InputGroup,InputGroupAddon } from 'reactstrap';
import Octicon from 'react-octicon';
import './AddCard.css';

export class AddCard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        edited: false,
        cardName: ""
      }
  }

  handleSubmit = ( event ) => {
    event.preventDefault();
    const cardName = this.state.cardName;
    this.props.addCard(cardName);
    this.setState({ cardName: "", edited: false })
  }

  handleChange = async (event) => {
      const value = event.target.value;
      this.setState({
          cardName: value,
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
        <Card className="AddCard">
          { (this.state.edited) ?
                <Form className="form" onSubmit={this.handleSubmit}>
                    <InputGroup>
                      <Input
                          type="text"
                          name="cardName"
                          placeholder="Card name"
                          required={true}
                          onChange={(e) => this.handleChange(e)}
                      />
                        <InputGroupAddon addonType="append"><Button color="success"><Octicon name="plus"/></Button></InputGroupAddon>
                        <InputGroupAddon addonType="append"><Button outline color="secondary" type="button" onClick={ () => this.toggleEdited() }><Octicon name="x"/></Button></InputGroupAddon>

                    </InputGroup>
                </Form>
            :
            <Button onClick={() => this.toggleEdited() }>Add a card</Button>
          }
        </Card>
    )
  }
}
