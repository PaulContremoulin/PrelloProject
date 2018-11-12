// Modules
import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// Css...

// Actions & Constant
import {connect} from "react-redux";
import {fetchBoards} from "../../../actions/boardActions";


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

    render() {
        return (
            <ButtonDropdown className="float-right" direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    Filter
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Archived</DropdownItem>
                    <DropdownItem>Not archived</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        )
    }
}

const mapStateToProps = ( state, props ) => ({
    boards: state.boards,
});

const mapDispatchToProps = ( dispatch ) => ({
    fetchBoards: (res) => dispatch( fetchBoards(res)),
});

export const ButtonFiltre = connect(
    mapStateToProps,
    mapDispatchToProps,
)( ButtonFiltreToBeConnected );
