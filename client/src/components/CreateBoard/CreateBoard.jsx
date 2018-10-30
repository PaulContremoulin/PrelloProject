// Modules
import React from 'react';
import {Button, Container, Row, Col} from 'reactstrap';
import Popup from "reactjs-popup";

// Css
import './CreateBoard.css';

// Actions & Constant

export class CreateBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)

    }
    openModal (){
        this.setState({ open: true })
    }
    closeModal () {
        this.setState({ open: false })
    }

    render() {
        return (
            <div>
                <Button className="button" onClick={this.openModal}> Create Board </Button>
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <Container>
                        <Row>
                            <Col>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
                                omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
                                ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
                                doloribus. Odit, aut.
                            </Col>
                        </Row>
                        <Row className="test">
                            <Col>
                                <Button onClick={this.closeModal}>Return</Button>
                            </Col>
                            <Col>
                                <Button>Create</Button>
                            </Col>
                        </Row>
                    </Container>
                </Popup>
            </div>
        )
    }
}


