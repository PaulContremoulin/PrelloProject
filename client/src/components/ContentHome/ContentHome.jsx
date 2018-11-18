// Modules
import React from 'react';
import {connect} from "react-redux";
import {Row, Col} from 'reactstrap';
import { history } from '../../history';

// Css...
import './ContentHome.css';

// Actions & Constant
import {CreateBoard} from "../CreateBoard/CreateBoard";
import {CardBoard} from "../CardBoard/CardBoard";
import {fetchBoards} from "../../actions/boardActions";
import {fetchCircles} from "../../actions/circleActions";
import {ButtonFiltre} from "./ButtonFiltre/ButtonFiltre";


export class ContentHomeToBeConnected extends React.Component {

    constructor(props) {
        super(props);
    }

    goToPageBoard = (board) => {
      history.push('/board/' + board._id + '/' + board.name)
    }

    render() {
        return (
            <div>
                <Row className="titleContent">
                    <Col xs={12}>
                        {this.props.state ?
                            <h2>Personal Boards (Archived)</h2>
                            :
                            <h2>Personal Boards</h2>
                        }
                            <ButtonFiltre />
                    </Col>
                </Row>
                <Row className="displayCardBoard">
                    {this.props.boards.map(board => {
                        return(
                            <Col className="displayBoard" xs={12} sm={6} md={6} xl={3} key={ board._id }>
                                <CardBoard key={ board._id } board={board} goToPageBoard={() => this.goToPageBoard(board)} />
                            </Col>
                        )
                    })}
                    {!this.props.state &&
                    <Col className="displayBoard" xs={12} sm={6} md={6} xl={3}>
                        <CreateBoard/>
                    </Col>
                    }
                </Row>
            </div>
        )
    }
}

const mapStateToProps = ( state, props ) => ({
    boards: state.boards,
    state: state.state,
});

const mapDispatchToProps = ( dispatch ) => ({
    fetchBoards: (res) => dispatch( fetchBoards(res)),
    fetchCircles: (res) => dispatch( fetchCircles(res)),
});

export const ContentHome = connect(
    mapStateToProps,
    mapDispatchToProps,
)( ContentHomeToBeConnected );
