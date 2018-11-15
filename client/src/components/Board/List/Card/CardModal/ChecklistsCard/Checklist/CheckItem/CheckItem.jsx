import React from "react";
import {Col, Input, Row, Progress} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare} from '@fortawesome/fontawesome-free-regular';

import './CheckItem.css';
import {postCheckitemToCard} from "../../../../../../../../requests/checklists";
import { putItemState } from "../../../../../../../../requests/checklists";
export class CheckItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    };

    changeItemState(checked){
        let stateLabel;
        stateLabel = (checked) ? "completed" : "incomplete";
        putItemState(this.props.checklistId, this.props.checkItem.id, stateLabel)
            .then( () => this.props.checkItemSetState(this.props.checkItem.id, stateLabel, this.props.checklistId));
    }

    addCheckItem = (nameItem) => {
        postCheckitemToCard(nameItem, this.props.checklist.id)
            .then( (res) => this.props.addCheckItem(this.props.checklist.id, res.data));
        this.setState({ checkItemInput: false })
    };

    render() {
        const {
            checkItem,
            checklistId,
            checkItemSetState
        } = this.props;
        return (
            <Col className="checkItem">
                <Input
                    type="checkbox"
                    checked={checkItem.state === "completed"}
                    onChange={(e) => this.changeItemState(e.target.checked)}/>{checkItem.name}
            </Col>
        );
    }
}