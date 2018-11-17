import React from 'react';
import {Draggable} from "react-beautiful-dnd";

// Components & Actions
import {CardModal} from './CardModal/CardModal';

// Css
import {Container, Row, Col, Card, CardText, CardTitle, CardBody, Button, Badge} from 'reactstrap';
import Octicon from 'react-octicon';
import './Card.css';
import styled from 'styled-components';
import dateFormat from "dateformat";

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
        const {card, board, index, listId, openModal, labelsBoard} = this.props;
        const {open} = this.state;
        const labelsCard = labelsBoard.filter(
            label => card.idLabels.includes(label.id)
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
                                    <Badge style={{"background-color": label.color, "margin-right":"4px", "display":"inline"}}>{label.name}</Badge>
                                )}
                                </div>
                                <h5>{card.name}</h5>
                                {(card.due) ?
                                    <div><Badge style={{'color': 'white'}} color={this.dueDateState()}> Due
                                        : {dateFormat(card.due, "shortDate")} </Badge></div>
                                    : null}
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
