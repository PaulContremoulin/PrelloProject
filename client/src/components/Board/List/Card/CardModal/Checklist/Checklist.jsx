import React from 'react';

// Components & Actions
import { CheckItem } from './CheckItem/CheckItem';

// Css
import { Container, Row, Col, Input, Card, CardText, CardTitle, CardBody, CardFooter, Button } from 'reactstrap';
import Octicon from 'react-octicon';

import './Checklist.css';


export class Checklist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputChecklistName: false,
    }
  }

  handleOnBlurChecklist = (e) => {
    const newName = e.target.value;
    if (newName !== this.props.checklist.name) {
      this.props.putChecklist( newName )
      .then( () => this.props.checklistSetName( newName ) )
    }
    this.setState({ inputChecklistName: false })

  }

  toggleCheklistInput = () => {
    this.setState({ inputChecklistName: true })
  };

  render() {
    const { checklist,
      putChecklist,
      checklistSetName, checklistSetPos,
      checkItemSetName, checkItemSetPos, checkItemSetState,
     } = this.props;
     const { inputChecklistName } = this.state;
    return(
      <div className="Checklist">
        <Row>
          <Card className="ChecklistCard">
          <CardTitle className="ChecklistTitle" onClick={ () => this.toggleCheklistInput() }>
          {(inputChecklistName) ?
            <Input
              type="text"
              name="checklistName"
              placeholder="checklist name"
              defaultValue={checklist.name}
              onBlur={(e) => this.handleOnBlurChecklist(e)}
            />
            :
            checklist.name
          }</CardTitle>
          {(checklist.checkItems) ?
          <CardBody>
            <Col>
              <Row>
                {checklist.checkItems.map(
                    (checkItem, index) =>
                      <CheckItem checkItem={ checkItem }
                        checkItemSetName={ checkItemSetName }
                        checkItemSetPos={ checkItemSetPos }
                        checkItemSetState={ checkItemSetState }
                      />
                  )}
              </Row>
            </Col>
          </CardBody>
          :
          null
          }
          <CardFooter>Add CheckItem</CardFooter>
          </Card>
        </Row>
      </div>
    )
  }
}
