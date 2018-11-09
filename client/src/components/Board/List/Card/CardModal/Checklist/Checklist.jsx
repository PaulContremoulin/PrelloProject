import React from 'react';

// Components & Actions
import { CheckItem } from './CheckItem/CheckItem';

// Css
import { Container, Row, Col, Card, CardText, CardTitle, CardBody, Button } from 'reactstrap';
import Octicon from 'react-octicon';
import './Checklist.css';


export class Checklist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    const { checklist } = this.props;
    return(
      <div className="Checklist">
        <Row>
          {checklist.name}
          {(checklist.checkItems) ?
          <Col>
            <Row>
              {checklist.checkItems.map(
                  (checkItem, index) => <CheckItem checkItem={ checkItem } />
                )}
            </Row>
          </Col>
          :
          null
          }
        </Row>
      </div>
    )
  }
}
