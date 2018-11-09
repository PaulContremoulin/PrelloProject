import React from 'react';

// Components & Actions

// Css
import { Container, Row, Col, Card, CardText, CardTitle, CardBody, Button } from 'reactstrap';
import Octicon from 'react-octicon';
import './CheckItem.css';


export class CheckItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    const { checkItem } = this.props;
    return(
      <div className="CheckItem">
        <Row>
          {checkItem.name}
        </Row>
      </div>
    )
  }
}
