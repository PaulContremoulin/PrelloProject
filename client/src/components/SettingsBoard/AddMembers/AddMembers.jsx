// Modules
import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import {ListGroupItem, ListGroup, Modal, ModalFooter, ModalBody, ModalHeader, Row, Button, FormGroup, Form, Label, Input} from 'reactstrap';
import {addMember} from "../../../requests/memberships";

// Css...
import './AddMembers.css';


// Actions & Constant
import {getMembersSearch} from "../../../requests/memberships";
import {setBoardMembers} from "../../../actions/boardActions";

export class AddMembersToBeConnected extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            membersFind : [],

    };
    }

    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.membersFind.filter(member =>
            member.username.toLowerCase().slice(0, inputLength) === inputValue
        );
    }


    getMemberInDB = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        if (inputLength !== 0) {
            getMembersSearch(value)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res.data);
                        this.setState({
                            membersFind: res.data,
                        })
                    }
                })
        }
    }


    getSuggestionValue = (suggestion) => {
        return suggestion.username;
    }

    renderSuggestion = (suggestion) => {
        return (
            <div>{suggestion.username}</div>
        );
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        this.getMemberInDB(newValue);
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    addMemberInDB = () => {
        const idBoard = this.props.board._id;
        console.log(idBoard);
        const idUser = this.state.membersFind[0]._id;
        addMember(idBoard, idUser, 'normal')
            .then(res => {
                if (res.status === 200){
                    this.props.setBoardMembers(res.data.memberships);
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Add a new member",
            value,
            onChange: this.onChange
        };
        return (
            <div>
                <Row>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps} />
                <Button color="secondary" onClick={() => this.addMemberInDB()}>Add member</Button>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    board: state.board,
});
const mapDispatchToProps = (dispatch) => ({
    setBoardMembers: (res) => dispatch(setBoardMembers(res)),
});

export const AddMembers = connect(
    mapStateToProps,
    mapDispatchToProps
)( AddMembersToBeConnected )