import React from 'react';

// Components & Actions

// Css
import './TagsList.css'

import {Row, Button, Form, Input, Popover, InputGroup, InputGroupAddon, Col} from 'reactstrap';
import Octicon from 'react-octicon';
import {postLabel, deleteLabel} from "../../../../requests/labels";
import {faTags} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/fontawesome-free-solid/index";

export class TagsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverTagsList : false,
            tagColor : '#ffffff'
        }
    };

    toggleTagsList() {
        this.setState({popoverTagsList: !this.state.popoverTagsList});
    };

    addTagToList = (tagName, color) => {
        postLabel(this.props.boardId, tagName, color)
            .then((res) => this.props.addLabel(res.data));
    };

    deleteTagToList = (idLabel) => {
        deleteLabel(idLabel)
            .then((res) => this.props.deleteLabelFromBoard(idLabel));
    };

    handleColorChange = (event) => {
        this.setState({tagColor: event.target.value});
    }

    render() {
        const { boardId, boardLabels, addLabel, deleteLabelFromBoard} = this.props;
        return (
            <Button outline color="secondary" size="sm" id="TagsListId" onClick={ () => this.toggleTagsList() } block>
                <span className="nbTags">{boardLabels.length}</span><FontAwesomeIcon color="white" icon={faTags}/>
                <Popover placement="bottom" isOpen={this.state.popoverTagsList} target="TagsListId" toggle={() => this.toggleTagsList()}>
                    <Col>
                        {boardLabels.map( (label, index) =>
                                    <div className="tagsItem" style={{'background-color':label.color}}>
                                        <span>{label.name}</span>
                                        <Button size="sm" className="deleteTag float-right" onClick={() => this.deleteTagToList(label.id)} close/>
                                    </div>
                            )}
                    </Col>
                    <Form className="form" onSubmit={(e) => { e.preventDefault(); this.addTagToList(e.target.tagName.value, e.target.tagColor.value)}}>
                        <InputGroup>
                            <Input
                                type="text"
                                name="tagName"
                                placeholder="Add a tag"
                                required={true}
                                size="sm"
                            />
                            <Input
                                size="sm"
                                type="color"
                                name="tagColor"
                                value={this.state.tagColor}
                                style={{"max-width":"40px"}}
                                onChange={ (e) => this.handleColorChange(e)}
                                required={true}
                            />
                            <InputGroupAddon addonType="append">
                                <Button size="sm" color="success"><FontAwesomeIcon className="float-right" color="white" icon={faPlus}/></Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Form>
                </Popover>
            </Button>
        )
    }

    /*
    <Button color="primary" size="sm" id="addCheckItemId" onClick={ () => this.toggleAddChecklist() } block>
                Add a checklist
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
     */
}
