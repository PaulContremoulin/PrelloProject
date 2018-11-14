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
import {ButtonFiltre} from "./ButtonFiltre/ButtonFiltre";


export class ContentHomeToBeConnected extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isArchived: false
        };
    }

    goToPageBoard = (board) => {
      history.push('/board/' + board._id + '/' + board.name)
    }

    render() {
        return (
            <div>
                <Row className="titleContent">
                    <Col xs={12}>
                        {this.state.isArchived ?
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
                    {!this.state.isArchived &&
                    <Col className="displayBoard" xs={12} sm={6} md={6} xl={3}>
                        <CreateBoard/>
                    </Col>
                    }
                </Row>
            </div>
        )
    }

    componentDidMount() {
        const nbrArchived = this.props.boards.filter(board => board.closed === true).length;
        const nbrNotArchived = this.props.boards.filter(board => board.closed !== true).length;
        console.log(nbrArchived)
        const temp = (nbrArchived !== 0);
        this.setState({isArchived:temp})

    }

    componentDidUpdate() {
        const nbrArchived = this.props.boards.filter(board => board.closed === true).length
        console.log(nbrArchived)
        const isArchivedConst = nbrArchived !== 0;
        if (this.state.isArchived !== isArchivedConst) {
            this.setState({isArchived: isArchivedConst});
        }
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
