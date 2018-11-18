import React from "react";
import { Tooltip} from "reactstrap";

export class MemberItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tooltipOpen : false
        }
    }

    initialsNames = (member) => {
        let ln = member.idMember.lastName;
        let fn = member.idMember.firstName;
        return fn[0].toUpperCase() + ln[0].toUpperCase();
    }

    describeMember = (member) => {
        return member.idMember.firstName + ' ' + member.idMember.lastName + ' (' + member.idMember.username + ')'
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render() {
        const { member }  = this.props;
        return (
            <div className="memberCardIcon" id={"memberTooltipId" + member._id}>{this.initialsNames(member)}
                <Tooltip placement="bottom" style={{"background-color":"grey"}} isOpen={this.state.tooltipOpen} target={"memberTooltipId" + member._id} toggle={ () => {this.toggle()}}>
                    {this.describeMember(member)}
                </Tooltip>
            </div>
        );
    }

}