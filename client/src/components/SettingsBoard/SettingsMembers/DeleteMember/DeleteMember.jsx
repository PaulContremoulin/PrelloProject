// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Modal, ModalBody, ModalFooter, Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Css...
import './DeleteMember.css';

// Actions & Constant
import {deleteMember} from "../../../../requests/memberships";
import {setBoardMembers, fetchBoards} from "../../../../actions/boardActions";
import {getBoardsUser} from "../../../../requests/boards";

export class DeleteMemberToBeConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    };

    deleteMemberFunction = () => {
        deleteMember(this.props.idBoard, this.props.idMemberShip)
            .then(res => {
                if(res.status === 200){
                    const newMemberShips = this.props.board.memberships.filter(member => member._id !== this.props.idMemberShip)
                    this.props.setBoardMembers(newMemberShips)
                    getBoardsUser(this.props.user.member._id)
                        .then(res => {
                            this.props.fetchBoards(res.data)
                        })
                        .catch(error => {
                            console.log(error)
                        });
                }
            })
    }

    render() {
        return (
            <div className="DeleteMember">
                <FontAwesomeIcon icon={faTrash} size="1x" className="float-right" onClick={this.toggle}/>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>Do you want delete this member ? </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="danger" onClick={() => this.deleteMemberFunction()}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    board: state.board,
    user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
    setBoardMembers: (res) => dispatch( setBoardMembers(res)),
    fetchBoards: (res) => dispatch( fetchBoards(res)),
});

export const DeleteMember = connect(
    mapStateToProps,
    mapDispatchToProps
)( DeleteMemberToBeConnected )