import React from 'react';
import {Row, Button, Form, Input, Popover, InputGroup, InputGroupAddon, Col} from 'reactstrap';
import {faCheck, faPlus} from "@fortawesome/fontawesome-free-solid/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CirclePicker} from "react-color";
import {faTags} from "@fortawesome/free-solid-svg-icons/index.es";

// Components & Actions
import {postLabel, postLabelToCard, removeLabelFromCard} from "../../../../../../requests/labels";

// Css
import './AddTag.css'

export class AddTag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverAddTag: false,
            tagColor : '#607d8b',
            tagNameValue : ''
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

        this.setState({tagNameValue: ''});
    };

    handleColorChange = (color) => {
        this.setState({tagColor: color.hex});
    };

    onChangeValue = (event) => {
        this.setState({tagNameValue: event.target.value});
    }

    render() {
        const {labelsBoard, labelsCard, cardId, boardId, addLabelCard} = this.props;
        return (
            <Button className="addTag" color="primary" size="sm" id="addTagId" onClick={() => this.toggleAddTag()} block>
                <FontAwesomeIcon className='iconBefore' icon={faTags}/>Manage tags
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
                                value={this.state.tagNameValue}
                                onChange={this.onChangeValue}
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
