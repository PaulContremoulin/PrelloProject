import React from 'react';

// Components & Actions

// Css
import { Container, Row, Col, Card, CardText, CardTitle, CardBody, Button } from 'reactstrap';
import Octicon from 'react-octicon';
import './Card.css';

export const CardComponent = ({ card, openModal }) => (
    <div className="Card">
      <Row>
        <Card className="CardCeption" onClick={() => openModal()}>
          <CardTitle>
            {card.cardName}
            <Button className="BtnUpdateCard" outline color="secondary" type="button"><Octicon name="pencil"/></Button>
          </CardTitle>
        </Card>
      </Row>
    </div>
)
