// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Modal, ModalFooter, ModalBody, ModalHeader, Row, Button} from 'reactstrap';

// Css...
import './AddMembers.css';


// Actions & Constant

export class AddMembersToBeConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'open': false,
            'visible': false,
        }
    }

    openModal (){
        this.setState({ open: true })
    };

    closeModal () {
        this.setState({
            open: false,
            'visible': false,
            'name':'',
        })
    };

    onDismiss = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <div className="SettingsBoard">
                <Button className="float-right" color="secondary" size="sm" onClick={() => this.openModal()}>Add members</Button>
                <Modal isOpen={this.state.open} toggle={() =>this.closeModal() } centered={true}>
                    <ModalHeader toggle={() =>this.closeModal()}>Add Members</ModalHeader>
                        <ModalBody>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() =>this.closeModal() }>Return</Button>
                            <Button color="primary">Create</Button>
                        </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    board: state.board,
});
const mapDispatchToProps = (dispatch) => ({});

export const AddMembers = connect(
    mapStateToProps,
    mapDispatchToProps
)( AddMembersToBeConnected )