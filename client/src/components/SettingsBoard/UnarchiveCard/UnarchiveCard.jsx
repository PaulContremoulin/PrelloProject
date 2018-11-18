// Modules
import React from 'react';
import {connect} from "react-redux";
import {Button, Row, Col, ListGroup, ListGroupItem, Alert} from 'reactstrap';
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
            lengthCards: 0,
        };
    }

    unarchive = (card, idList) => {
        changeCardClosed(card.id, "false")
            .then(res => {
                this.props.setClosed(idList, card.id, false, this.props.board._id)
                this.setState({lengthCards: this.state.lengthCards - 1})
            })
    }

    render() {
        return (
            <div>
                {this.state.lengthCards !== 0 &&
                <div>
                    <Row>
                        <Col className="ContentArchivedCard">
                            <h4><FontAwesomeIcon icon={faAlignJustify} size="1x"/> Archived Cards</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{size: 11, offset: 1}}>
                            <ListGroup className="scrollingListCards">
                                {this.props.board.lists.map(list => list.cards.map(card => {
                                        if (card.closed !== false) {
                                            return (
                                                <ListGroupItem key={card.id}>
                                                    <Row>
                                                        <Col sm={6}>
                                                            {'Name card : ' + card.name}
                                                        </Col>
                                                        <Col sm={6}>
                                                            <Button className="float-right"
                                                                    onClick={() => this.unarchive(card, list._id)}
                                                                    color="secondary" size="sm">Unarchive</Button>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            )
                                        }
                                    }
                                ))}
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
        this.props.board.lists.map(list => list.cards.map(card => card.closed !== false ? cardsTest.push({card:card})  : -1))
        this.setState({lengthCards: cardsTest.length})
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