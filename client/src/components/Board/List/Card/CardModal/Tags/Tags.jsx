import React from "react";
import {changeCardName} from "../../../../../../requests/cards";
import {Badge, Col, Form, Input} from "reactstrap";
import './Tags.css';

export class Tags extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { labelsCard }  = this.props;
        return (
            <Col>
                {labelsCard.map( (label, index) =>
                    <Badge className="tagBadge" style={{"background-color":label.color}}>{label.name}</Badge>
                )}
            </Col>
        );
    }

}