import React from "react";
import {Col, Input, Row, Button, Form} from "reactstrap";
import {changeCardDesc} from "../../../../../../requests/cards";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAlignJustify} from '@fortawesome/free-solid-svg-icons';

// Css
import './DescCard.css';

export class DescCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descInput: false
        }
    }

    setDesc = (desc) => {
        if (desc !== this.props.desc) {
            changeCardDesc(this.props.cardId, desc)
                .then(() => this.props.setDesc(desc))
        }
        this.setState({descInput: false})
    }

    toggleDescInput = () => {
        this.setState({descInput: true})
    }

    render() {
        const {cardId, desc, setDesc} = this.props;
        return (
            <Col>
                <Row>
                    <Col xs="1"><FontAwesomeIcon className='icon' icon={faAlignJustify}/></Col>
                    {(this.state.descInput) || (desc === "")?
                        <Col xs="11">
                            <Form onSubmit={ (e) => { e.preventDefault(); this.setDesc(e.target.descName.value)}}>
                                <Input
                                    type="textarea"
                                    name="descName"
                                    placeholder="Add a description for your card..."
                                    defaultValue={desc}
                                    onBlur={(e) => this.setDesc(e.target.value)}
                                />
                                <Button className="float-right  descButton" color="danger" size="sm">Cancel</Button>
                                <Button className="float-right  descButton" type="submit" value="Submit" color="success" size="sm">Save</Button>
                            </Form>
                        </Col>
                        :
                        <Col xs="11">
                            <span><i>Description</i></span>
                            <p onClick={() => this.toggleDescInput()}>{desc}</p>
                        </Col>
                    }
                </Row>
            </Col>
        );
    }

}