import React from 'react';

// Components & Actions

// Css
import { Container, Row, Col, Input, Card, CardText, CardTitle, CardBody, CardFooter, Button } from 'reactstrap';
import Octicon from 'react-octicon';
import './Label.css';


export class LabelComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputLabel: false,
    }
  }

  toggleLabelInput = () => {
    this.setState({ inputLabel: true })
  }

  handleOnBlur = (e) => {
    this.setState({ inputLabel: false })
  }

  render() {
    const {
      label,
     } = this.props;
     const { inputLabel } = this.state;
    return(
      <div className="Label">
        <Row>
          <Card className="LabelCard">
            <CardTitle className="LabelTitle" onClick={ () => this.toggleLabelInput() }>
              {(inputLabel) ?
                <Input
                  type="text"
                  name="labelName"
                  defaultValue={label.name}
                  onBlur={(e) => this.handleOnBlur(e)}
                />
                :
                label.name
              }
            </CardTitle>
          </Card>
        </Row>
      </div>
    )
  }
}
