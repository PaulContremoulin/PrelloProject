import React from "react";
import {changeCardName} from "../../../../../../requests/cards";
import {Badge, Col, Form, Input} from "reactstrap";


export class Tags extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { labelsCard }  = this.props;
        return (
            <Col>
                {labelsCard.map( (label, index) =>
                    <Badge style={{"background-color":label.color, "margin-right":"4px"}}>{label.name}</Badge>
                )}
            </Col>
        );
    }

}