// Modules
import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import {Row, Button, Col, Form, InputGroup, InputGroupAddon} from 'reactstrap';

// Css...
import './AddMembersCreateBoard.css';


// Actions & Constant
import {getMembersSearch} from "../../../requests/memberships";
import {setBoardMembers, addMemberAction, fetchBoards} from "../../../actions/boardActions";
import {getBoardsUser} from "../../../requests/boards";

export class AddMembersCreateBoardToBeConnected extends React.Component {
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

    addMemberInStore = () => {
        console.log("ok")
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
                <Form className="form" onSubmit={ (e) => this.addMemberInStore(e) }>
                    <Row>
                        <Col xs={8} sm={8} md={9}>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={inputProps} />
                        </Col>
                        <Col xs={4} sm={4} md={3}>
                            <Button className="buttonAddMember" color="secondary" type="submit">Add</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
});
const mapDispatchToProps = (dispatch) => ({});

export const AddMembersCreateBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)( AddMembersCreateBoardToBeConnected )
