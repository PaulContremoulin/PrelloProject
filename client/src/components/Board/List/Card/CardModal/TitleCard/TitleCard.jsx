import React from "react";
import {changeCardName} from "../../../../../../requests/cards";
import { Col, Form, Input } from "reactstrap";

import './TitleCard.css'

export class TitleCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openInputHeader: false
        }
    }

    setCardName = (name) => {
        if (name !== this.props.name) {
            changeCardName(this.props.cardId, name )
                .then( () => this.props.setName(name) )
        }
        this.setState({ openInputHeader: false })
    };

    toggleInputHeader = () => this.setState({ openInputHeader: !this.state.openInputHeader });

    render() {
        const { cardId, name, setName }  = this.props;
        return (
            <Col className="cardTitle">
                {(this.state.openInputHeader) ?
                    <h4>
                        <Form onSubmit={ (e) => { e.preventDefault(); this.setCardName(e.target.cardName.value)}}>
                            <Input
                                type="text"
                                name="cardName"
                                placeholder="Card name"
                                autoFocus
                                required={true}
                                defaultValue={name}
                                onBlur={(e) => this.setCardName(e.target.value)}
                            />
                            <input hidden={true} type="submit" value="Submit" />
                        </Form>
                    </h4>
                    :
                    <h4 onClick={ () => this.toggleInputHeader() } >{name}</h4>
                }
            </Col>
        );
    }

}