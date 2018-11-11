// Modules
import React from 'react';
import {Popover, PopoverBody, PopoverHeader, Button, Col, Row} from 'reactstrap';
import {getMember} from "../../../../requests/memberships";
// Css...
import './ShowProfileMember.css';

// Actions & Constant


export class ShowProfileMember extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            member: "",
        };
    }

    openPopover = () => {
        getMember(this.props.idMember)
            .then(res => {
                this.setState({
                    member: res.data,
                    popoverOpen: !this.state.popoverOpen
                });
            })
            .catch(err => {
                console.log(err)
            })
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
                <Popover className="popov" placement="left" isOpen={this.state.popoverOpen} target={'Popover-'+this.props.usernameMember} toggle={this.toggle}>
                    <PopoverHeader>{this.state.member.username}</PopoverHeader>
                    <PopoverBody>
                        <Row>
                            <Col>
                                {this.state.member.firstName +' '+this.state.member.lastName}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.state.member.email}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.state.member.organization}
                            </Col>
                        </Row>
                    </PopoverBody>
                </Popover>
            </div>
        )
    }
}