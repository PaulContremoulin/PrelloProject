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
    }

    closeModal = () => {
        this.setState({open: false})
    }

    render() {
        const {card, board, index, listId, openModal} = this.props;
        console.log(card);
        const {open} = this.state;
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
                                    <h5>{card.name}</h5>
                                    {(card.due) ?
                                        <div><Badge color="primary"> Due : {dateFormat(card.due, "shortDate")} </Badge></div>
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

// <Button className="BtnUpdateCard" outline color="secondary" type="button"><Octicon name="pencil"/></Button>
/*
  id string
  The ID of the card

  checkItemStates array

  closed boolean
  Whether the card is closed (archived). Note: Archived lists and boards do not cascade archives to cards. A card can have closed: false but be on an archived board.

  desc string
  The description for the card. Up to 16384 chars.

  due date
  The due date on the card, if one exists

  dueComplete boolean
  Whether the due date has been marked complete

  idBoard string
  The ID of the board the card is on

  idChecklists array of strings
  An array of checklist IDs that are on this card

  idLabels array of strings
  An array of label IDs that are on this card

  idList string
  The ID of the list the card is in

  idMembers array of strings
  An array of member IDs that are on this card

  labels array of Labels
  Array of label objects on this card

  name string
  Name of the card

  pos float
  Position of the card in the list
*/
