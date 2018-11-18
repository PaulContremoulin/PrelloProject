import React from 'react';
import {Button, Form, Input, Popover, InputGroup, InputGroupAddon} from 'reactstrap';
import {faCheckSquare} from "@fortawesome/fontawesome-free-regular";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

// Components & Actions
import {postChecklistToCard} from "../../../../../../requests/checklists";

// Css
import './AddChecklist.css'
import Octicon from 'react-octicon';

export class AddChecklist extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          popoverAddChecklist: false
      }
    };

    toggleAddChecklist() {
        this.setState({popoverAddChecklist: !this.state.popoverAddChecklist});
    };

    addChecklistToCard = (checklistName) => {
        postChecklistToCard(checklistName, this.props.cardId, this.props.boardId)
            .then(checklist => this.props.addChecklist(checklist.data))
        this.toggleAddChecklist();
    };

    render() {
        const {addChecklist, cardId, boardId} = this.props;
        return (
              <Button color="primary" size="sm" id="addCheckItemId" onClick={ () => this.toggleAddChecklist() } block>
                  <FontAwesomeIcon className='iconBefore' icon={faCheckSquare}/>Add a checklist
                  <Popover placement="bottom" isOpen={this.state.popoverAddChecklist} target="addCheckItemId" toggle={() => this.toggleAddChecklist()}>
                      <Form className="form" onSubmit={(e) => { e.preventDefault(); this.addChecklistToCard(e.target.checklistName.value)}}>
                          <InputGroup>
                              <Input
                                  type="text"
                                  name="checklistName"
                                  placeholder="Checklist name"
                                  required={true}
                                  size="sm"
                              />
                              <InputGroupAddon addonType="append">
                                  <Button size="sm" color="success"><Octicon size="sm" name="plus"/></Button>
                              </InputGroupAddon>
                          </InputGroup>
                      </Form>
                  </Popover>
              </Button>
        )
    }
}
