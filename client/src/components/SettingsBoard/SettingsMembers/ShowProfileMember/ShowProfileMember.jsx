// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Popover, PopoverBody, PopoverHeader, Button, ListGroup, ListGroupItem} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

// Css...
import './ShowProfileMember.css';

// Actions & Constant


export class ShowProfileMember extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            user: "",
        };
    }

    openPopover = () => {
        //todo: getMember
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    };

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    };

    render() {
        return (
            <div className="ModifyRoleMember">
                <Button color="link" className="member" id={'Popover-'+this.props.usernameMember} onClick={() => this.openPopover()}>{this.props.usernameMember}</Button>
                <Popover placement="left" isOpen={this.state.popoverOpen} target={'Popover-'+this.props.usernameMember} toggle={this.toggle}>
                    <PopoverHeader>Member's information</PopoverHeader>
                    <PopoverBody>
                        ok
                    </PopoverBody>
                </Popover>
            </div>
        )
    }
}