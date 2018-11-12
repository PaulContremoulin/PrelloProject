// Modules
import React from 'react';
import {Container, Row, Col, Alert} from 'reactstrap';
import { history } from '../../history';

// Css...
import './ContentHome.css';

// Actions & Constant
import {CreateBoard} from "../CreateBoard/CreateBoard";
import {connect} from "react-redux";
import {CardBoard} from "../CardBoard/CardBoard";
import {getBoardsUser, getListsOfBoard} from "../../requests/boards";
import {getCirclesUser} from "../../requests/circle";
import {fetchBoards} from "../../actions/boardActions";
import {fetchCircles} from "../../actions/circleActions";


export class ContentHomeToBeConnected extends React.Component {

    goToPageBoard = (board) => {
      history.push('/board/' + board._id + '/' + board.name)
    }

    render() {
        return (
            <div>
                <Row className="titleContent">
                    <Col>
                        <h2>Personnal's Boards</h2>
                    </Col>
                </Row>
                <Row>
                    {this.props.boards.map(board => {
                        return(
                            <Col className="displayBoard" xs={12} sm={6} md={3} key={ board._id }>
                                <CardBoard board={board} goToPageBoard={() => this.goToPageBoard(board)} />
                            </Col>
                        )
                    })}
                    <Col className="displayBoard" xs={12} sm={6} md={3}>
                        <CreateBoard/>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = ( state, props ) => ({
    user : state.user,
    boards: state.boards,
    circles: state.circles,
});

const mapDispatchToProps = ( dispatch ) => ({
    fetchBoards: (res) => dispatch( fetchBoards(res)),
    fetchCircles: (res) => dispatch( fetchCircles(res)),
});

export const ContentHome = connect(
    mapStateToProps,
    mapDispatchToProps,
)( ContentHomeToBeConnected );
