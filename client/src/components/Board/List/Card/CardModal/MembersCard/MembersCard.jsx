import React from "react";
import {Col} from "reactstrap";
import './MembersCard.css';
import {MemberItem} from "./MemberItem/MemberItem";

export class MembersCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { membersCard }  = this.props;
        return (
            <Col className="memberCardContainer">
                {membersCard.map( (member, index) =>
                    <MemberItem member={member}/>
                )}
            </Col>
        );
    }

}