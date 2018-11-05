// Modules
import React from 'react';
import {Container, Row, Col, Alert} from 'reactstrap';

// Css...
import './ContentHome.css';

// Actions & Constant
import {CreateBoard} from "../CreateBoard/CreateBoard";
import {CreateCircle} from "../CreateCircle/CreateCircle";
import {connect} from "react-redux";
import {CardBoard} from "../CardBoard/CardBoard";
import {CardCircle} from "../CardCircle/CardCircle";
import {getBoardsUser} from "../../requests/boards";
import {getCirclesUser} from "../../requests/circle";
import {fetchBoards} from "../../actions/boardActions";
import {fetchCircles} from "../../actions/circleActions";


export class ContentHomeToBeConnected extends React.Component {
    render() {
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
                                        <Col className="displayBoard" xs={12} sm={6} md={3}>
                                            <CardBoard board={board} key={ board._id }/>
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

    componentDidMount() {
       getBoardsUser(this.props.user.member._id)
         .then(res => {this.props.fetchBoards(res.data)})
           .catch(error => {console.log(error)});
       getCirclesUser(this.props.user.member._id)
         .then(res => {this.props.fetchCircles(res.data)})
           .catch(error => {console.log(error)})
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