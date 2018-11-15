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
                    <Col xs="11">
                        <h5>Description</h5>
                    {(this.state.descInput) || (desc === "")?
                        <Form onSubmit={ (e) => { e.preventDefault(); this.setDesc(e.target.descName.value)}}>
                            <Input
                                style={{"margin-top":"8px"}}
                                type="textarea"
                                name="descName"
                                placeholder="Add a description for your card..."
                                defaultValue={desc}
                            />
                            {(desc !== "") ? <Button className="float-right  descButton" onClick={() => {this.setState({descInput: false})}} color="danger" size="sm">Cancel</Button> : null}
                            <Button className="float-right  descButton" type="submit" value="Submit" color="success" size="sm">Save</Button>
                        </Form>
                        :
                        <p onClick={() => this.toggleDescInput()}>{desc}</p>
                    }
                    </Col>
                </Row>
            </Col>
        );
    }

}