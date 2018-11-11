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

  handleOnBlurChecklist = () => {

  }

  toggleCheklistInput = () => {
    this.setState({ inputChecklistName: true })
  }

  render() {
    const { checklist,
      checklistSetName, checklistSetPos,
      checkItemSetName, checkItemSetPos, checkItemSetState,
     } = this.props;
     const { inputChecklistName } = this.state;
    return(
      <div className="Checklist">
        <Row>
          <Card className="ChecklistCard">
          <CardTitle className="ChecklistTitle" onclick={ () => this.toggleCheklistInput() }>
          {(inputChecklistName) ?
            checklist.name
            :
            <Input
              type="text"
              name="checklistName"
              placeholder="checklist name"
              defaultValue={checklist.name}
              onBlur={(e) => this.handleOnBlurChecklist(e)}
            />
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
