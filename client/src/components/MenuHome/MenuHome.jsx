// Modules
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {history} from "../../history";

// Css
import './MenuHome.css';

// Actions & Constant
import {CreateCircle} from "../CreateCircle/CreateCircle";
import {fetchCircles} from "../../actions/circleActions";
import {getCirclesUser} from "../../requests/circle";
import {getBoardsCircle} from "../../requests/circle";
import {setCircle} from "../../actions/circleActions";
import {getBoardsUser} from "../../requests/boards";
import {fetchBoards} from "../../actions/boardActions";
import {changeState} from "../../actions/stateBoards";


export class MenuHomeToBeConnected extends React.Component {

    redirectionCircle = (id, name) => {
        getBoardsCircle(id)
            .then(res => {
                if(res.status === 200){
                    this.props.setCircle(res.data);
                    history.push('/circle/'+id+'/'+name);
                } else {
                    console.log("error");
                }
            })
            .catch(error => {console.log(error)});
    };

    redirectionBoardPersonnal = () => {
        history.push('/home');
    };

    render() {
        return (
            <div className="vertical-menu">
                <Row>
                    <Col xs={12}>
                        <h3 className="title">Boards</h3>
                    </Col>
                    <Col xs={12}>
                        <ListGroup>
                            <ListGroupItem className="ListMenu" tag="a" onClick={() => this.redirectionBoardPersonnal()} action>Personal boards</ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col xs={8} sm={4}>
                        <h3 className="title">Circles</h3>
                    </Col>
                    <Col xs={2} sm={8}>
                        <CreateCircle/>
                    </Col>
                    <Col xs={12}>
                        <ListGroup>
                            {this.props.circles.map(circle => {
                                return (
                                    <ListGroupItem key={circle._id} className="ListMenu" tag="a" onClick={() => this.redirectionCircle(circle._id, circle.name)} action>{circle.name}</ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.circles.length === 0) {
            getCirclesUser(this.props.user.member._id)
                .then(res => {
                    this.props.fetchCircles(res.data)
                })
                .catch(error => {
                    console.log(error)
                });
        }
        if (this.props.boards.length === 0) {
            getBoardsUser(this.props.user.member._id,"false")
                .then(res => {
                    this.props.fetchBoards(res.data)
                    this.props.changeState(false)
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    circles: state.circles,
    boards: state.boards,
})

const mapDispatchToProps = (dispatch) => ({
    fetchCircles: (res) => dispatch( fetchCircles(res)),
    setCircle: (res) => dispatch( setCircle(res)),
    fetchBoards: (res) => dispatch( fetchBoards(res)),
    changeState: (res) => dispatch( changeState(res)),
})

export const MenuHome = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MenuHomeToBeConnected);
