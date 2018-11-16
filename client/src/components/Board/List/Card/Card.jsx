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
