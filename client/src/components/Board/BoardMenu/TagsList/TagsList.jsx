import React from 'react';
import { CirclePicker } from 'react-color';
import {
    Row,
    Button,
    Form,
    Input,
    Popover,
    InputGroup,
    InputGroupAddon,
    Col
} from 'reactstrap';
import {faTags, faTimes} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/fontawesome-free-solid/index";

// Components & Actions
import {postLabel, deleteLabel} from "../../../../requests/labels";

// Css
import './TagsList.css'

export class TagsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverTagsList : false,
            tagColor : '#607d8b',
            tagNameValue : ''
        }
    };

    toggleTagsList() {
        this.setState({popoverTagsList: !this.state.popoverTagsList});
    };

    addTagToList = (tagName, color) => {
        postLabel(this.props.boardId, tagName, color)
            .then((res) => this.props.addLabel(res.data));
        this.setState({tagNameValue: ''});
    };

    deleteTagToList = (idLabel) => {
        deleteLabel(idLabel)
            .then((res) => this.props.deleteLabelFromBoard(idLabel));
    };

    handleColorChange = (color) => {
        this.setState({tagColor: color.hex});
    }

    onChangeValue = (event) => {
        this.setState({tagNameValue: event.target.value});
    }

    render() {
        const { boardId, boardLabels, addLabel, deleteLabelFromBoard} = this.props;
        return (
            <Button outline color="secondary" size="sm" id="TagsListId" onClick={ () => this.toggleTagsList() } block>
                <span className="nbTags">{boardLabels.length}</span><FontAwesomeIcon color="white" icon={faTags}/>
                <Popover placement="bottom" isOpen={this.state.popoverTagsList} target="TagsListId" toggle={() => this.toggleTagsList()}>
                    <Col className="TagScroll">
                        {boardLabels.map( (label, index) =>
                                    <div key={label._id} className="tagsItem">
                                        <div className="tagsName" style={{'background-color':label.color}}><span>{label.name}</span></div>
                                        <a onClick={() => this.deleteTagToList(label.id)} className="float-right tagsAddon"><FontAwesomeIcon color="black" icon={faTimes}/></a>
                                    </div>
                            )}
                    </Col>
                    <Form className="form" onSubmit={(e) => { e.preventDefault(); this.addTagToList(e.target.tagName.value, e.target.tagColor.value)}}>
                        <InputGroup>
                            <Input
                                type="text"
                                name="tagName"
                                value={this.state.tagNameValue}
                                onChange={this.onChangeValue}
                                placeholder="Add a tag"
                                required={true}
                                size="sm"
                            />
                            <Input
                                id="colorInputId"
                                size="sm"
                                type="color"
                                name="tagColor"
                                value={this.state.tagColor}
                                style={{"max-width":"40px"}}
                                onClick={ (e) => { e.preventDefault(); }}
                                required={true}
                            />
                            <InputGroupAddon addonType="append">
                                <Button size="sm" color="success"><FontAwesomeIcon  color="white" icon={faPlus}/></Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <Row className="pickerColor">
                            <Col>
                            <CirclePicker
                                color={ this.state.tagColor }
                                onChange={ (e) => this.handleColorChange(e)}
                            /></Col>
                        </Row>
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
