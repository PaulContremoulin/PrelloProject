import React from 'react';

// Components & Actions

// Css
import {Row, Button, Form, Input, Popover, InputGroup, InputGroupAddon, Col} from 'reactstrap';
import './AddTag.css'
import {postLabel, postLabelToCard, removeLabelFromCard} from "../../../../../../requests/labels";
import { faCheck, faPlus} from "@fortawesome/fontawesome-free-solid/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class AddTag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverAddTag: false,
            tagColor : '#ffffff'
        }
    };

    toggleAddTag() {
        this.setState({popoverAddTag: !this.state.popoverAddTag});
    };

    addTagToCard = (idLabel) => {
        if(this.props.labelsCard.includes(idLabel.toString())){
            removeLabelFromCard(idLabel, this.props.cardId)
                .then(() => this.props.deleteLabelCard(idLabel))
        }else{
            postLabelToCard(idLabel, this.props.cardId)
                .then(() => this.props.addLabelCard(idLabel))
        }
    };

    addTagToList = (tagName, color) => {
        postLabel(this.props.boardId, tagName, color)
            .then((res) => this.props.addLabel(res.data));
    };

    handleColorChange = (event) => {
        this.setState({tagColor: event.target.value});
    }

    render() {
        const {labelsBoard, labelsCard, cardId, boardId, addLabelCard} = this.props;
        return (
            <Button className="addTag" color="primary" size="sm" id="addTagId" onClick={() => this.toggleAddTag()} block>
                Add a tag
                <Popover placement="bottom" isOpen={this.state.popoverAddTag} target="addTagId"
                         toggle={() => this.toggleAddTag()}>
                    <Col className="tagListCard">
                        {labelsBoard.map((label, index) =>
                            <div className="tagsItemCard" onClick={() => this.addTagToCard(label.id)} style={{'background-color': label.color}}>
                                <span>{label.name}</span>
                                {(labelsCard.includes(label.id.toString())) ? <FontAwesomeIcon className="float-right" color="white" icon={faCheck}/> : null }
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
}
