// Modules
import React from 'react';
import {connect} from "react-redux";
import {Button, Fade, Table, Alert} from 'reactstrap';


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
                const test = this.state.cardsIdList.filter(cardT=> cardT.card.id !== cardIdList.card.id)
                this.setState({cardsIdList:test})
            })
    }

    render() {
        return (
            <div>
                {this.state.cardsIdList.length !== 0 &&
                    <Table striped size="sm">
                        <thead>
                            <tr>
                                <th>Name Card</th>
                                <th>Unarchive</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cardsIdList.map(cardIdList => {
                                return (
                                    <tr>
                                        <th>{cardIdList.card.name}</th>
                                        <td><Button onClick={() => this.unarchive(cardIdList)} close>+</Button></td>
                                    </tr>
                                )
                                }
                            )}
                            </tbody>
                    </Table>
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
    user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
    setClosed: (res) => dispatch(setClosed(res)),
});

export const UnarchiveCard = connect(
    mapStateToProps,
    mapDispatchToProps
)( UnarchiveCardToBeConnected )