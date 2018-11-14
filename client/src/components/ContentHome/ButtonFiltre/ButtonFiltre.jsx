// Modules
import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// Css...

// Actions & Constant
import {connect} from "react-redux";
import {fetchBoards} from "../../../actions/boardActions";
import {getBoardsUser} from "../../../requests/boards";


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
    boards: state.boards,
    user : state.user,
});

const mapDispatchToProps = ( dispatch ) => ({
    fetchBoards: (res) => dispatch( fetchBoards(res)),
});

export const ButtonFiltre = connect(
    mapStateToProps,
    mapDispatchToProps,
)( ButtonFiltreToBeConnected );
