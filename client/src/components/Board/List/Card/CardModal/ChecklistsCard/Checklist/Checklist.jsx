import React from "react";
import {Col, Input, Row, Progress, Form} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare} from '@fortawesome/fontawesome-free-regular';
import { CheckItem } from './CheckItem/CheckItem';


import './Checklist.css'
import {changeCardName} from "../../../../../../../requests/cards";

export class Checklist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputChecklistName: false,
            inputCheckItemInput: false,
        }
    };

    toggleChecklistInput = () => {
        this.setState({ inputChecklistName: !this.state.inputChecklistName })
    };

    toggleCheckItemInput = () => {
        this.setState({ inputCheckItemInput: !this.state.inputCheckItemInput })
    };

    addCheckItem = (name) => {
        if (name !== this.props.name) {
            changeCardName(this.props.cardId, name )
                .then( () => this.props.setName(name) )
        }
        this.setState({ openInputHeader: false })
    };

    render() {
        const {
            checklist,
            key,
            checklistSetName,
            checklistSetPos
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
                        <h5 onClick={() => this.toggleChecklistInput()}><FontAwesomeIcon style={{"margin-right":"8px"}} icon={faCheckSquare}/>{checklist.name}</h5>
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
                            {(this.state.inputCheckItemInput)
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