// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Container, Alert, Row, Col} from 'reactstrap';

// Css...
import './SettingsBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

// Actions & Constant
import {TitleSettingsBoard} from "../../components/SettingsBoard/TitleSettingsBoard/TitleSettingsBoard";
import {setBoard ,setBoardMembers} from "../../actions/boardActions";
import {getMembersOfBoard} from "../../requests/boards";
import {SettingsMembers} from "./SettingsMembers/SettingsMembers";
import {EditInformation} from "./EditInformation/EditInformation";
import {EditStateBoard} from "./EditStateBoard/EditStateBoard";

export class SettingsBoardToBeConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGood: true,
            'type': "",
            'nbrMember':1,
        }
    }


    render() {
        return (
            <div className="SettingsBoard">
                {this.state.isGood ?
                    <Container>
                        <TitleSettingsBoard boardName={this.props.board.name} boardId={this.props.board._id}/>
                        <hr className="my-2"/>
                        <Row>
                            <Col sm={12} md={7}>
                                <SettingsMembers type={this.state.type} nbrMember={this.state.nbrMember}/>
                            </Col>
                            <Col sm={12} md={{size:4, offset:1}}>
                                <h4 className="contentSettings"><FontAwesomeIcon icon={faWrench} size="1x"/> Settings</h4>
                                {this.state.type !== "observer" ?
                                    <Row className="butContentSettings">
                                        <Col sm={6} md={{size: 10, offset: 2}}>
                                            <EditInformation/>
                                        </Col>
                                        <Col sm={6} md={{size: 10, offset: 2}}>
                                            <EditStateBoard/>
                                        </Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Alert color="primary">
                                            You don't have the permission to change information and status !
                                        </Alert>
                                    </Row>
                                }
                            </Col>
                        </Row>
                    </Container>
                    :
                    <Alert color="danger">
                        You don't have permission to access on this board
                    </Alert>
                }
            </div>
        )
    }

    componentDidMount() {
        const idBoard = this.props.boardId;
        const nameBoard = this.props.boardName;
        if ((this.props.board._id !== idBoard) || (this.props.board.name !== nameBoard)) {
            const newBoard = this.props.boards.filter(board => (board._id === idBoard) && (board.name === nameBoard));
            console.log(this.props.boards)
            console.log(newBoard)
            if (newBoard.length === 0) {
                console.log("ok")
                this.setState({isGood: false});
            } else {
                this.props.setBoard(newBoard[0]);
                this.setState({isGood: true});
            }
        }
        const newBoard = this.props.boards.filter(board => (board._id === idBoard) && (board.name === nameBoard));
        if (this.state.isGood && newBoard.length !== 0) {
            if (this.props.board.memberships.username === undefined) {
                getMembersOfBoard(idBoard)
                    .then(res => {
                        this.props.setBoardMembers(res.data);
                    })
                    .catch(err => console.log(err))
            }
            const members = this.props.board.memberships;
            const you = members.filter(member => member.idMember._id === this.props.user.member._id);
            const nbrAdmin = members.filter(member => member.memberType === "admin");
            this.setState({type: you[0].memberType,nbrMember:nbrAdmin.length})
        } else {
            this.setState({isGood: false});
        }
    }

    componentDidUpdate(prevProps) {
        if(this.state.isGood) {
            const members = this.props.board.memberships;
            const nbrAdmin = members.filter(member => member.memberType === "admin");
            if (this.state.nbrMember !== nbrAdmin.length) {
                this.setState({nbrMember: nbrAdmin.length});
            }
        }
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    boards: state.boards,
    board: state.board,
});
const mapDispatchToProps = (dispatch) => ({
    setBoard: (res) => dispatch(setBoard(res)),
    setBoardMembers: (res) => dispatch(setBoardMembers(res)),
});

export const SettingsBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)( SettingsBoardToBeConnected )