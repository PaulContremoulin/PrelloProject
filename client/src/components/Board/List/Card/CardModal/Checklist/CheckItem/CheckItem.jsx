import React from 'react';

// Components & Actions

// Css
import { Container, CustomInput, Row, Col, Input, Card, CardText, CardTitle, CardBody, Button } from 'reactstrap';
import Octicon from 'react-octicon';
import './CheckItem.css';


export class CheckItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputCheckItem: false,
      // checked: false,
    }
  }

  toggleInput = () => {
    this.setState({ inputCheckItem: !this.state.inputCheckItem })
  }

  toggleChecked = (e) => {
    // this.setState({ checked: e.target.checked })

  }

  handleOnBlurCheckItem = (e) => {
    // TODO: 
  }

  componentDidMount() {
    // this.setState({
    //   checked: (this.props.checkItem.state === "completed")
    // })
  }

  render() {
    const { checkItem,
      checkItemSetName, checkItemSetPos, checkItemSetState,
     } = this.props;
    return(
      <div className="CheckItem">
        <Row>
          <Card className="CheckItem">
            <CardTitle>
              <CustomInput type="checkbox" id="checked" checked={ checkItem.state === "completed" } onclick={ (e) => {this.toggleChecked(e)}} />
              { (this.state.inputCheckItem) ?
                <Input
                  type="text"
                  name="checkItemName"
                  placeholder="checkItem name"
                  defaultValue={checkItem.name}
                  onBlur={(e) => this.handleOnBlurCheckItem(e)}
                />
                :
                <span onclick={ () => {this.toggleInput()}}>{checkItem.name}</span>
              }
            </CardTitle>
          <Card>
        </Row>
      </div>
    )
  }
}
