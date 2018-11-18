// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Modal, ModalBody, ModalFooter, Button} from 'reactstrap'

// Css...
import './EditStateBoard.css';

// Actions & Constant
import {fetchBoards} from "../../../actions/boardActions";
import {changeInformationBoard, getBoardsUser} from "../../../requests/boards";
import {changeStateBoard} from "../../../actions/boardActions";

export class EditStateBoardToBeConnected extends React.Component {
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

    archiveBoard = () => {
        changeInformationBoard(this.props.board._id, this.props.board.name, this.props.board.desc, !this.props.board.closed)
            .then(res => {
                if (res.status === 200){
                    this.props.changeStateBoard(!this.props.board.closed)
                    this.toggle();
                    const nbrBoardsArchived = this.props.boards.filter(board => board.closed === true).length
                    let temp = "";
                    if (nbrBoardsArchived !== 0) {
                        temp = "true"
                    } else {
                        temp = "false"
                    }
                    getBoardsUser(this.props.user.member._id,temp)
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
                {this.props.board.closed ?
                    <div>
                        <Button className="butEditState" color="danger" onClick={this.toggle}>Unarchive Board</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalBody>Do you want unarchive this board ? </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                <Button color="danger" onClick={() => this.archiveBoard()}>Unarchive</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    :
                    <div>
                        <Button className="butEditState" color="danger" onClick={this.toggle}>Archive Board</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalBody>Do you want archive this board ? </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                <Button color="danger" onClick={() => this.archiveBoard()}>Archive</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    board: state.board,
    boards: state.boards,
});
const mapDispatchToProps = (dispatch) => ({
    fetchBoards: (res) => dispatch(fetchBoards(res)),
    changeStateBoard: (res) => dispatch(changeStateBoard(res)),
});

export const EditStateBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)( EditStateBoardToBeConnected )