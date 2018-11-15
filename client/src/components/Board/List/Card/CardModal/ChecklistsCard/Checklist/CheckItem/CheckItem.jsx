import React from "react";
import {Col, Input, Row, Progress} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare} from '@fortawesome/fontawesome-free-regular';

import './CheckItem'

export class CheckItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    };

    render() {
        const {
            checkItem,
        } = this.props;
        return (
            <Col >
                {checkItem.name}
            </Col>
        );
    }
}