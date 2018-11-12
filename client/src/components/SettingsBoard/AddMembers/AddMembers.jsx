// Modules
import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import {Row, Button, Col, Form, InputGroup, InputGroupAddon} from 'reactstrap';
import {addMember} from "../../../requests/memberships";

// Css...
import './AddMembers.css';


// Actions & Constant
import {getMembersSearch} from "../../../requests/memberships";
import {setBoardMembers, addMemberAction} from "../../../actions/boardActions";

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

    addMemberInDB = (e) => {
        e.preventDefault();
        const idBoard = this.props.board._id;
        const member = this.state.value;
        const membFind = this.state.membersFind.filter(memb => memb.username === member);
        if (membFind.length !== 0) {
            addMember(idBoard, membFind[0]._id, 'normal')
                .then(res => {
                    if (res.status === 200) {
                        this.props.addMemberAction(res.data);
                        this.setState({value:""})
                    } else {
                        console.log("error");
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
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
                <Form className="form" onSubmit={ (e) => this.addMemberInDB(e) }>
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
    board: state.board,
});
const mapDispatchToProps = (dispatch) => ({
    setBoardMembers: (res) => dispatch(setBoardMembers(res)),
    addMemberAction: (res) => dispatch(addMemberAction(res)),
});

export const AddMembers = connect(
    mapStateToProps,
    mapDispatchToProps
)( AddMembersToBeConnected )
