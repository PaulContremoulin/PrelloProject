// Modules
import React from 'react';
import { connect } from 'react-redux';

import { changeCardDueDate, cardDueDateCompleted } from '../../../../../../requests/cards';
import  dateFormat from 'dateformat';
import Calendar from 'react-calendar';
import {Popover, Button, Col, Badge, PopoverHeader, PopoverBody, Input, InputGroup, InputGroupAddon} from "reactstrap";

export class DateCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dueDateInput: false,
        }
    }

    handleOnChangeDueDate = (date) => {
        const newDate = date;
        if (newDate !== this.props.due) {
            changeCardDueDate(this.props.cardId, newDate )
                .then( () => this.props.setDue( newDate ) )
        }
        this.setState({ dueDateInput: false })
    }

    handleOnChangeDueCompleted = (complete) => {

        //e.target.checked
        /*const newDate = date;
        if (newDate !== this.props.due) {
            cardDueDateCompleted(this.props.cardId, complete )
                .then( () => this.props.setDue( newDate ) )
        }
        this.setState({ dueDateInput: false })*/
    }

    toggleDueInput = () => { this.setState({ dueDateInput : !this.state.dueDateInput }) }

    render() {
        const { setDue, setDueComplete, cardId, due, dueComplete }  = this.props;
        return (
                <Col>
                    {
                        (due !== null && due !== '')
                            ?
                            <h6 id="dueDateId">
                                For : {' '}
                                <Badge color="primary">
                                    <div onClick={() => this.toggleDueInput() }> { dateFormat(due, "fullDate")}</div>
                                </Badge>
                            </h6>
                            :
                            <h6 id="dueDateId" onClick={ () => this.toggleDueInput() }>No due date</h6>
                    }
                    <Popover placement="bottom" isOpen={this.state.dueDateInput} target="dueDateId" toggle={this.state.dueDateInput}>
                        <PopoverHeader> Due date </PopoverHeader>
                        <PopoverBody>
                            <Calendar
                                value={ due ? new Date(due) : new Date()}
                                onChange={(date) => this.handleOnChangeDueDate(date)}
                                onBlur={(e) => this.toggleDueInput()}
                            />
                            <Button size="sm" outline style={{'width':'100%', 'margin-top':'8px'}} color='danger' onClick={() => this.handleOnChangeDueDate(null)}>Delete the due date</Button>
                        </PopoverBody>
                    </Popover>
                </Col>
        );
    }

}