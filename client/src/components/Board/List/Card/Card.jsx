import React from 'react';
import { Draggable } from "react-beautiful-dnd";

// Components & Actions

// Css
import { Container, Row, Col, Card, CardText, CardTitle, CardBody, Button } from 'reactstrap';
import Octicon from 'react-octicon';
import './Card.css';
import styled from 'styled-components';

const ContainerCard = styled.div`
`;

export const CardComponent = ({ card, index, openModal }) => (
  <div className="Card">
    <Row>
      <Draggable
        draggableId={card.cardId.toString()}
        index={index}
      >
        {(provided) =>
          <ContainerCard
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card
              className="CardCeption"
              onClick={() => openModal()}
            >
              <CardTitle>
                {card.cardName}
                <Button className="BtnUpdateCard" outline color="secondary" type="button"><Octicon name="pencil"/></Button>
              </CardTitle>
            </Card>
          </ContainerCard>
        }
      </Draggable>
    </Row>
  </div>
)
