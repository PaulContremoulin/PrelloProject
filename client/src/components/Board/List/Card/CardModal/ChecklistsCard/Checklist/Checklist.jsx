import React from "react";
import {Col, Input, Row, Progress, Form, Button} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare} from '@fortawesome/fontawesome-free-regular';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { CheckItem } from './CheckItem/CheckItem';


import './Checklist.css'
import {deleteCecklist, postCheckitemToCard} from "../../../../../../../requests/checklists";
export class Checklist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputChecklistName: false,
            checkItemInput: false,
        }
    };

    toggleChecklistInput = () => {
        this.setState({ inputChecklistName: !this.state.inputChecklistName })
    };

    toggleCheckItemInput = () => {
        this.setState({ checkItemInput: !this.state.checkItemInput })
    };

    addCheckItem = (nameItem) => {
        postCheckitemToCard(nameItem, this.props.checklist.id)
            .then( (res) => this.props.addCheckItem(this.props.checklist.id, res.data));
        this.setState({ checkItemInput: false })
    };

    deleteChecklist = () => {
        deleteCecklist(this.props.checklist.id)
            .then( () => this.props.checkListDelete(this.props.checklist.id) );
    };

    render() {
        const {
            checklist,
            key,
            checklistSetName,
            checklistSetPos,
            checkListDelete,
            addCheckItem
        } = this.props;
        return (
            <Col >
                <Row className="Checklist">
                    <Col xs="12">
                    {(this.state.inputChecklistName)
                        ?
                        <div>
                            <Input
                                autoFocus
                                size="sm"
                                type="text"
                                name="checklistName"
                                placeholder="checklist name"
                                defaultValue={checklist.name}
                                onBlur={() => {this.toggleChecklistInput()}}
                            />
                        </div>
                        :
                        <Row>
                            <Col sm="10" onClick={() => this.toggleChecklistInput()}><h6><FontAwesomeIcon style={{"margin-right":"8px"}} icon={faCheckSquare}/>{checklist.name}</h6></Col>
                            <Col sm="2"><Button size="sm" className="float-right" close onClick={() => this.deleteChecklist()}/></Col>
                        </Row>
                    }
                    </Col>
                    <Col xs={{size:10, offset: 1}} className="CheckItems">
                        <Progress className="progressBar" value="25" />
                        {(checklist.checkItems) ?
                            checklist.checkItems.map(
                                (checkItem, index) =>
                                    <CheckItem checkItem={checkItem}
                                               index={index}
                                    />
                            ) : null
                        }
                        <div className="addCheckItem">
                            {(this.state.checkItemInput)
                                ?
                                <Form onSubmit={ (e) => { e.preventDefault(); this.addCheckItem(e.target.checkItem.value)}}>
                                    <Input
                                        autoFocus
                                        size="sm"
                                        type="text"
                                        name="checkItem"
                                        placeholder="check item name"
                                        onBlur={() => {this.toggleCheckItemInput()}}
                                    />
                                    <input hidden={true} type="submit" value="Submit" />
                                </Form>
                                :
                                <p onClick={() => this.toggleCheckItemInput()}>add a check item...</p>
                            }
                        </div>
                    </Col>
                </Row>
            </Col>
        );
    }
}