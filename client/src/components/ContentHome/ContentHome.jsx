// Modules
import React from 'react';
import {Container, Row, Col, Alert} from 'reactstrap';

// Css...
import './ContentHome.css';

// Actions & Constant
import {CreateBoard} from "../CreateBoard/CreateBoard";
import {connect} from "react-redux";
import {CardBoard} from "../CardBoard/CardBoard";
import {getBoardsUser} from "../../requests/boards";
import {fetchBoards} from "../../actions/boardActions";

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
                    { (this.props.boards.length > 0) ?
                    <Row>
                        <Col md="3">
                            {this.props.boards.map(board => {
                                    return(
                                        <CardBoard board={board} key={ board._id }/>
                                    )
                                })}
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col>
                            <Alert>
                                You didn't have a board !
                            </Alert>
                        </Col>
                    </Row>
                    }
                    <Row>
                        <Col>
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
            .catch(error => {console.log(error)})
    }
}

const mapStateToProps = ( state, props ) => ({
    user : state.user,
    boards: state.boards,
});

const mapDispatchToProps = ( dispatch ) => ({
    fetchBoards: (res) => dispatch( fetchBoards(res)),
});

export const ContentHome = connect(
    mapStateToProps,
    mapDispatchToProps,
)( ContentHomeToBeConnected );