// Modules
import React from 'react';
import {connect} from "react-redux";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// Actions & Constant
import {fetchBoards} from "../../../actions/boardActions";
import {getBoardsUser} from "../../../requests/boards";
import {changeState} from "../../../actions/stateBoards";


export class ButtonFiltreToBeConnected extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    getBoardsState = (state) => {
        getBoardsUser(this.props.user.member._id,state)
            .then(res => {
                this.props.fetchBoards(res.data)
                const temp = state === "true"
                this.props.changeState(temp)
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <ButtonDropdown className="float-right" direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    Filter
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => this.getBoardsState("true")}>Archived</DropdownItem>
                    <DropdownItem onClick={() => this.getBoardsState("false")}>Not archived</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        )
    }
}

const mapStateToProps = ( state, props ) => ({
    user : state.user,
});

const mapDispatchToProps = ( dispatch ) => ({
    fetchBoards: (res) => dispatch( fetchBoards(res)),
    changeState: (res) => dispatch( changeState(res)),
});

export const ButtonFiltre = connect(
    mapStateToProps,
    mapDispatchToProps,
)( ButtonFiltreToBeConnected );
