// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Modal, ModalBody, ModalFooter, Button} from 'reactstrap'

// Css...
import './DeleteAccount.css';

// Actions & Constant
import {deleteAccount} from "../../../requests/user";
import {fetchBoards, setBoard} from "../../../actions/boardActions";
import {logOut} from "../../../actions/signActions";
import {fetchCircles, setCircle} from "../../../actions/circleActions";
import {history} from "../../../history";

export class DeleteAccountToBeConnected extends React.Component {
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

    logOut = () => {
        const temp = [];
        const board = {
            _id: "",
            name: "",
            idOrganization: "",
            closed: false,
            desc: "",
            memberships: [],
            lists: [],
            prefs: {
                background:"",
            },
        };
        this.props.fetchCircles(temp);
        this.props.fetchBoards(temp);
        this.props.setBoard(board);
        this.props.setCircle(temp);
    };

    deleteAccountFunction = () => {
        this.logOut();
        deleteAccount(this.props.user.member._id);
        this.props.logOut();
        history.push('/');
    }

    render() {
        return (
            <div className="DeleteMember">
                <Button className="butDeleteUser" color="danger" onClick={this.toggle}>Delete account</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>Do you want delete your account ? </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="danger" onClick={() => this.deleteAccountFunction()}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch( logOut()),
    fetchBoards: (res) => dispatch(fetchBoards(res)),
    fetchCircles: (res) => dispatch(fetchCircles(res)),
    setBoard: (res) => dispatch(setBoard(res)),
    setCircle: (res) => dispatch(setCircle(res)),
});

export const DeleteAccount = connect(
    mapStateToProps,
    mapDispatchToProps
)( DeleteAccountToBeConnected )