import React from 'react';

// Components & Actions

// Css
import { Row, Card, Button, CardBody, CardTitle, Form, Input } from 'reactstrap';
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
      <Row>
        <Card className="AddCard">
          { (this.state.edited) ?
              <CardTitle>
                <Form className="form" onSubmit={this.handleSubmit}>
                  <Input
                      type="text"
                      name="cardName"
                      placeholder="Card name"
                      required={true}
                      onChange={(e) => this.handleChange(e)}
                  />
                  <Button color="success">Add a card</Button>
                  <Button outline color="secondary" type="button" onClick={ () => this.toggleEdited() }><Octicon name="x"/></Button>
                </Form>
              </CardTitle>
            :
            <CardTitle><Button onClick={() => this.toggleEdited() }>Add a card</Button></CardTitle>
          }
        </Card>
      </Row>
    )
  }
}
