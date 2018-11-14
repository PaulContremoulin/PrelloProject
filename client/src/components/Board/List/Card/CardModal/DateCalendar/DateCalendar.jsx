// Modules
import React from 'react';
import { connect } from 'react-redux';

import { changeCardDueDate } from '../../../../../../requests/cards';
import  dateFormat from 'dateformat';
import Calendar from 'react-calendar';
import { Popover, Button, Col, Badge, PopoverHeader, PopoverBody } from "reactstrap";


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

    toggleDueInput = () => { this.setState({ dueDateInput : !this.state.dueDateInput }) }

    render() {
        const { setDue, cardId, due }  = this.props;
        return (
                <Col>
                    {
                        (due !== null && due !== '')
                            ?
                            <h6 id="dueDateId" onClick={ () => this.toggleDueInput() }>For : <Badge color="primary"> { dateFormat(due, "fullDate") } </Badge></h6>
                            :
                            <h6 id="dueDateId" onClick={ () => this.toggleDueInput() }>No due date</h6>
                    }
                    <Popover placement="bottom" isOpen={this.state.dueDateInput} target="dueDateId" toggle={this.state.dueDateInput}>
                        <PopoverHeader> Due date </PopoverHeader>
                        <PopoverBody>
                            <Calendar
                                value={ due ? new Date(due) : new Date()}
                                onChange={ (date) => this.handleOnChangeDueDate(date)}
                                onBlur={(e) => this.toggleDueInput()}
                            />
                            <Button size="sm" outline style={{'width':'100%', 'margin-top':'8px'}} color='danger' onClick={() => this.handleOnChangeDueDate(null)}>Delete the due date</Button>
                        </PopoverBody>
                    </Popover>
                </Col>
        );
    }

}