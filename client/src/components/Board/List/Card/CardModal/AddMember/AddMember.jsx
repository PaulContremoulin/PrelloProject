import React from 'react';
import {Button, Popover, Col} from 'reactstrap';
import {faCheck} from "@fortawesome/fontawesome-free-solid/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/fontawesome-free-solid/index.es";

// Components & Actions
import {addMemberToCard, deleteMemberFromCard} from "../../../../../../requests/cards";

// Css
import './AddMember.css'

export class AddMember extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverAddMember: false,
            tagColor : '#607d8b'
        }
    };

    toggleAddTag() {
        this.setState({popoverAddMember: !this.state.popoverAddMember});
    };

    addOrDeleteMemberToCard = (idMember) => {
        if(this.props.idMembers.includes(idMember.toString())){
            deleteMemberFromCard(this.props.cardId, idMember)
                .then(() => this.props.deleteMemberCard(idMember))
        }else{
            addMemberToCard(this.props.cardId, idMember)
                .then(() => this.props.addMemberCard(idMember))
        }
    };

    render() {
        const {memberships, membersCard, idMembers,  cardId, addMemberCard, deleteMemberCard} = this.props;
        return (
            <Button color="primary" size="sm" id="addMemberId" onClick={() => this.toggleAddTag()} block>
                <FontAwesomeIcon className='iconBefore' icon={faUsers}/>Members
                <Popover placement="bottom" isOpen={this.state.popoverAddMember} target="addMemberId"
                         toggle={() => this.toggleAddTag()}>
                    <Col className="memberListCard">
                        {memberships.map((member, index) =>
                            <div className="memberItem" onClick={() => this.addOrDeleteMemberToCard(member._id)}>
                                <div className="memberName"><span>{member.idMember.username}</span></div>
                                {(idMembers.includes(member._id.toString())) ? <span className="memberAddon"><FontAwesomeIcon color="black" icon={faCheck}/></span> : null }
                            </div>
                        )}
                    </Col>
                </Popover>
            </Button>
        )
    }
}
