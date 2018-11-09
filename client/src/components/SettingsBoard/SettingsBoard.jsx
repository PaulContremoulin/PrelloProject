// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Container, Row} from 'reactstrap';

// Css...
import './SettingsBoard.css';
import {TitleSettingsBoard} from "../../components/SettingsBoard/TitleSettingsBoard/TitleSettingsBoard";
import {setBoard} from "../../actions/boardActions";
import {SettingsMembers} from "./SettingsMembers/SettingsMembers";
import {PageNoFound} from "../../pages/PageNoFound/PageNoFound";

// Actions & Constant

export class SettingsBoardToBeConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'isGood': true,
        }
    }



    render() {
        return (
            <div className="SettingsBoard">
                {this.state.isGood ?
                    <Container>
                        <TitleSettingsBoard boardName={this.props.board.name}/>
                        <hr className="my-2"/>
                        <SettingsMembers/>
                    </Container>
                    :
                    <PageNoFound/>
                }
            </div>
        )
    }

    componentDidMount() {
        const idBoard = this.props.boardId;
        if (this.props.board._id !== idBoard) {
            const newBoard = this.props.boards.filter(board => board._id === idBoard);
            if (newBoard.length === 0) {
                this.setState({isGood: false});
            } else {
                this.props.setBoard(newBoard[0]);
                this.setState({isGood: true});
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
});

export const SettingsBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)( SettingsBoardToBeConnected )