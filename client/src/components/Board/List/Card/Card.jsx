import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import {Card, Badge} from 'reactstrap';
import styled from 'styled-components';
import dateFormat from "dateformat";

// Components & Actions
import {CardModal} from './CardModal/CardModal';

// Css
import './Card.css';

const ContainerCard = styled.div`
`;

export class CardComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }


    openModal = () => {
        this.setState({open: true})
    };

    closeModal = () => {
        this.setState({open: false})
    };

    dueDateState = () => {
        if (this.props.card.dueComplete) return 'success';
        let now = new Date();
        let due = new Date(this.props.card.due);
        if (due < now) return 'danger';
        if (due < now.setDate(now.getDate() + 1)) return 'warning';
        else return 'primary';
    };

    render() {
        const {card, board, index, listId, openModal, labelsBoard, membersBoard} = this.props;
        const {open} = this.state;
        const labelsCard = labelsBoard.filter(
            label => card.idLabels.includes(label.id)
        );
        const membersCard = membersBoard.filter(
            member => card.idMembers.includes(member.id)
        );
        return (
            <div className="Card">
                <Draggable
                    draggableId={card.id}
                    index={index}
                >
                    {(provided) =>
                        <ContainerCard
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <div style={{"padding-bottom": "8px"}}>
                                <Card
                                    className="CardCeption"
                                    onClick={() => this.openModal()}
                                >
                                    <div style={{"margin-bottom":"8px"}}>
                                    {labelsCard.map((label) =>
                                        <div style={{"display":"inline-block"}}><Badge style={{"background-color": label.color, "margin-right":"4px", "display":"inline"}}>{label.name}</Badge></div>
                                    )}
                                    </div>
                                    <h5>{card.name}</h5>
                                    {(card.due) ?
                                        <div><Badge style={{'color': 'white'}} color={this.dueDateState()}> Due
                                            : {dateFormat(card.due, "shortDate")} </Badge></div>
                                        : null}
                                    <div style={{"margin-top":"8px"}}>
                                        {membersCard.map((member) =>
                                            <div className="memberCardIconMin">
                                                {member.idMember.lastName[0].toUpperCase() + member.idMember.firstName[0].toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        </ContainerCard>
                    }
                </Draggable>
                {(open) ?
                    <CardModal listId={listId} card={card} open={open} closeModal={() => this.closeModal()}/>
                    :
                    null
                }
            </div>
        )
    }
}
