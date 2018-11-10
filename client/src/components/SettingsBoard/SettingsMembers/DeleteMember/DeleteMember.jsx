// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Modal, ModalBody, ModalFooter, Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Css...
import './DeleteMember.css';

// Actions & Constant

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

    render() {
        return (
            <div className="DeleteMember">
                <FontAwesomeIcon icon={faTrash} size="1x" className="float-right" onClick={this.toggle}/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>Do you want delete this member ? </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="danger">Delete</Button>
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
const mapDispatchToProps = (dispatch) => ({});

export const DeleteMember = connect(
    mapStateToProps,
    mapDispatchToProps
)( DeleteMemberToBeConnected )