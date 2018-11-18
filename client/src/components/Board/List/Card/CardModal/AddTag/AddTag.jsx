import React from 'react';

// Components & Actions

// Css
import {Row, Button, Form, Input, Popover, InputGroup, InputGroupAddon, Col} from 'reactstrap';
import './AddTag.css'
import {postLabel, postLabelToCard, removeLabelFromCard} from "../../../../../../requests/labels";
import {faCheck, faPlus, faTimes} from "@fortawesome/fontawesome-free-solid/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CirclePicker} from "react-color";

export class AddTag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverAddTag: false,
            tagColor : '#607d8b'
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

    handleColorChange = (color) => {
        this.setState({tagColor: color.hex});
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
                            <div className="tagsItem" onClick={() => this.addTagToCard(label.id)} style={{'background-color': label.color}}>
                                <div className="tagsName" style={{'background-color':label.color}}><span>{label.name}</span></div>
                            {(labelsCard.includes(label.id.toString())) ? <span className="tagsAddon"><FontAwesomeIcon color="white" icon={faCheck}/></span> : null }
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
}
