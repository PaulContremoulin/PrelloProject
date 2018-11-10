// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Popover, PopoverBody, PopoverHeader, Button, ListGroup, ListGroupItem} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

// Css...
import './ModifyRoleMember.css';

// Actions & Constant
import {addMember} from "../../../../requests/memberships";

export class ModifyRoleMemberToBeConnected extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false,
            roles:[],
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    };

    changeRole = (role) => {
        addMember(this.props.board._id, this.props.member.idMember._id, role)
            .then(res => {
                if (res.status === 200){
                    this.props.setBoardMembers(res.data.memberships);
                    this.toggle()
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="ModifyRoleMember">
                <FontAwesomeIcon icon={faEdit} size="1x" id={'Popover-' + this.props.member.idMember._id} onClick={this.toggle} className="float-right"/>
                <Popover placement="right" isOpen={this.state.popoverOpen} target={'Popover-' + this.props.member.idMember._id} toggle={this.toggle}>
                    <PopoverHeader>Change Role</PopoverHeader>
                    <PopoverBody>
                        <ListGroup>
                            {this.state.roles.map(role => {
                                if (role !== this.props.member.memberType) {
                                    return (
                                        <ListGroupItem tag="a" href="" action onClick={() => this.changeRole(role)}>
                                            {role}
                                        </ListGroupItem>
                                    )
                                }
                            })}
                        </ListGroup>
                    </PopoverBody>
                </Popover>
            </div>
        )
    }

    componentDidMount(){
        const idUser = this.props.user.member.id;
        console.log("*********")
        console.log(this.props.board.memberships)
        const member =this.props.board.memberships.filter(member => member.idMember === idUser);
        if (member[0].memberType !== "admin") {
            this.setState({roles:["normal","observer"]})
        } else {
            this.setState({roles:["admin","normal","observer"]})
        }
    }
}

const mapStateToProps = (state, props) => ({
    board: state.board,
    user: state.user,
});
const mapDispatchToProps = (dispatch) => ({});

export const ModifyRoleMember = connect(
    mapStateToProps,
    mapDispatchToProps
)( ModifyRoleMemberToBeConnected )