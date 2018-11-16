import React from "react";
import {Col, Input, Row, Progress, Form, Button} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare} from '@fortawesome/fontawesome-free-regular';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { CheckItem } from './CheckItem/CheckItem';


import './Checklist.css'
import {deleteChecklist, postCheckitemToCard, putChecklist} from "../../../../../../../requests/checklists";
export class Checklist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputChecklistName: false,
            checkItemInput: false,
            value: ''
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
        this.setState({value: ''});
    };

    deleteChecklist = () => {
        deleteChecklist(this.props.checklist.id)
            .then( () => this.props.checkListDelete(this.props.checklist.id) );
    };

    progressItem = () => {
        return (this.props.checklist.checkItems.filter( i => i.state === "completed").length / this.props.checklist.checkItems.length) * 100;
    };

    handleInputChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    checklistSetName = (nameItem) => {
        putChecklist( this.props.checklist.id, nameItem)
            .then( () =>  this.props.checklistSetName(this.props.checklist.id, nameItem));
        this.toggleChecklistInput();
    };

    render() {
        const {
            checklist,
            key,
            checklistSetName,
            checkItemSetState,
            checklistSetPos,
            checkListDelete,
            checkItemDelete,
            addCheckItem
        } = this.props;
        return (
            <Col >
                <Row className="Checklist">
                    <Col xs="12">
                    {(this.state.inputChecklistName)
                        ?
                        <div>
                            <Form onSubmit={ (e) => { e.preventDefault(); this.checklistSetName(e.target.checklistName.value)}}>
                                <Input
                                    autoFocus
                                    size="sm"
                                    type="text"
                                    name="checklistName"
                                    placeholder="checklist name"
                                    defaultValue={checklist.name}
                                    onBlur={() => {this.toggleChecklistInput()}}
                                />
                                <input hidden={true} type="submit" value="Submit" />
                            </Form>
                        </div>
                        :
                        <Row>
                            <Col sm="10" onClick={() => this.toggleChecklistInput()}><h6><FontAwesomeIcon style={{"margin-right":"8px"}} icon={faCheckSquare}/>{checklist.name}</h6></Col>
                            <Col sm="2"><Button size="sm" className="float-right" close onClick={() => this.deleteChecklist()}/></Col>
                        </Row>
                    }
                    </Col>
                    <Col xs={{size:10, offset: 1}} className="CheckItems">
                        {(checklist.checkItems && checklist.checkItems.length > 0) ?
                            <div>
                                <Progress className="progressBar" value={this.progressItem()} />
                                {checklist.checkItems.map(
                                    (checkItem, index) =>
                                        <CheckItem index={index}
                                                   checkItem={checkItem}
                                                   checklistId={checklist.id}
                                                   checkItemDelete={checkItemDelete}
                                                   checkItemSetState={(checkItem, checkState) => {
                                                       checkItemSetState(checkItem, checkState, checklist.id)
                                                   }}
                                        />
                                )}
                            </div>
                            : null
                        }
                        <div className="addCheckItem">
                            {(this.state.checkItemInput)
                                ?
                                <Form onSubmit={ (e) => { e.preventDefault(); this.addCheckItem(e.target.checkItem.value)}}>
                                    <Input
                                        autoFocus
                                        size="sm"
                                        type="text"
                                        value={this.state.value}
                                        name="checkItem"
                                        placeholder="check item name"
                                        onChange={ (e) => this.handleInputChange(e)}
                                        onBlur={() => {this.toggleCheckItemInput()}}
                                    />
                                    <input hidden={true} type="submit" value="Submit" />
                                </Form>
                                :
                                <div className="addField" onClick={() => this.toggleCheckItemInput()}>add a check item...</div>
                            }
                        </div>
                    </Col>
                </Row>
            </Col>
        );
    }
}