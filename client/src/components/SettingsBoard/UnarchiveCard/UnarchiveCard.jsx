// Modules
import React from 'react';
import {connect} from "react-redux";
import {Button, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';

// Css...
import './UnarchiveCard.css';

// Actions & Constant
import {changeCardClosed} from "../../../requests/cards";
import {setClosed} from "../../../actions/cardActions";

export class UnarchiveCardToBeConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsIdList: [],
        };
    }

    unarchive = (cardIdList) => {
        changeCardClosed(cardIdList.card.id, "false")
            .then(res => {
                this.props.setClosed(cardIdList.idList, cardIdList.card.id, false, this.props.board._id)
                const test = this.state.cardsIdList.filter(cardT=> cardT.card.id !== cardIdList.card.id)
                this.setState({cardsIdList:test})
            })
    }

    render() {
        return (
            <div>
                {this.state.cardsIdList.length !== 0 &&
                <div>
                    <Row>
                        <Col className="ContentArchivedCard">
                            <h4><FontAwesomeIcon icon={faAlignJustify} size="1x"/> Archived Cards</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{size:11, offset:1}}>
                            <ListGroup className="scrollingListCards">
                                {this.state.cardsIdList.map(cardIdList => {
                                        return (
                                            <ListGroupItem key={cardIdList.card.id}>
                                                <Row>
                                                    <Col sm={6}>
                                                        {'Name card : '+cardIdList.card.name}
                                                    </Col>
                                                    <Col sm={6}>
                                                        <Button className="float-right" onClick={() => this.unarchive(cardIdList)} color="secondary" size="sm">Unarchive</Button>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        )
                                    }
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
                }
            </div>
        );
    }

    componentDidMount() {
        var cardsTest = [];
        this.props.board.lists.map(list => list.cards.map(card => card.closed !== false ? cardsTest.push({card:card,idList:list._id})  : -1))
        this.setState({cardsIdList: cardsTest})
    }
}

const mapStateToProps = (state, props) => ({
    board: state.board,
});
const mapDispatchToProps = (dispatch) => ({
    setClosed: (idList, idCard, closed, idBoard) => dispatch(setClosed(idList, idCard, closed, idBoard)),
});

export const UnarchiveCard = connect(
    mapStateToProps,
    mapDispatchToProps
)( UnarchiveCardToBeConnected )