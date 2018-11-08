// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Container, Row} from 'reactstrap';

// Css...
import './SettingsBoard.css';
import {TitleSettingsBoard} from "../../components/SettingsBoard/TitleSettingsBoard/TitleSettingsBoard";
import {setBoard} from "../../actions/boardActions";
import {SettingsMembers} from "./SettingsMembers/SettingsMembers";

// Actions & Constant

export class SettingsBoardToBeConnected extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="SettingsBoard">
                <Container>
                    <TitleSettingsBoard boardName={this.props.board.name}/>
                    <hr className="my-2" />
                    <SettingsMembers/>
                </Container>
            </div>
        )
    }

    componentDidMount() {
        const idBoard = this.props.boardId;
        const newBoard = this.props.boards.filter(board => board._id === idBoard);
        this.props.setBoard(newBoard[0]);
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    boards: state.boards,
    board: state.board,
});
const mapDispatchToProps = (dispatch) => ({
    setBoard: (res) => dispatch(setBoard(res)),
});

export const SettingsBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)( SettingsBoardToBeConnected )