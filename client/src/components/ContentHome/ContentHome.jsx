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
import {fetchBoards, setBoard} from "../../actions/boardActions";
import {fetchCircles} from "../../actions/circleActions";


export class ContentHomeToBeConnected extends React.Component {

    goToPageBoard = (board) => {
      getListsOfBoard(board._id, true)
      .then( lists => {
        const setupBoard = board;
        setupBoard["lists"] = lists.data;
        this.props.setBoard(setupBoard);
      })
      .then( () => history.push('/board'))
    }

    render() {
        const { setBoard } = this.props;
        return (
            <div>
                <Container className="contentHome">
                    <Row>
                        <Col>
                            <h2>Personnal's Boards</h2>
                        </Col>
                    </Row>
                </Container>
                <Container className="contentBoard">
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
                </Container>
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
    setBoard: (board) => dispatch( setBoard(board)),

});

export const ContentHome = connect(
    mapStateToProps,
    mapDispatchToProps,
)( ContentHomeToBeConnected );
