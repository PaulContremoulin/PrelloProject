import React from "react";
import {Col, Input, Row, Progress, Button} from "reactstrap";

import {deleteCheckItem, putItemState} from "../../../../../../../../requests/checklists";
import './CheckItem.css';
import {checkItemDelete} from "../../../../../../../../actions/checkObjectActions";

export class CheckItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    };

    changeItemState(checked){
        let stateLabel;
        stateLabel = (checked) ? "completed" : "incomplete";
        putItemState(this.props.checklistId, this.props.checkItem.id, stateLabel)
            .then( () => this.props.checkItemSetState(this.props.checkItem.id, stateLabel, this.props.checklistId));
    }

    deleteCheckItem = () => {
        deleteCheckItem(this.props.checklistId, this.props.checkItem.id)
            .then( () => this.props.checkItemDelete(this.props.checklistId, this.props.checkItem.id));
    };

    render() {
        const {
            checkItem,
            checklistId,
            checkItemSetState,
            checkItemDelete
        } = this.props;
        return (
            <Col className="checkItem">
                <Input
                    type="checkbox"
                    checked={checkItem.state === "completed"}
                    onChange={(e) => this.changeItemState(e.target.checked)}/>
                <div className="itemField">{checkItem.name}<Button size="sm" className="closeItem float-right" close onClick={() => this.deleteCheckItem()}/></div>
            </Col>
        );
    }
}