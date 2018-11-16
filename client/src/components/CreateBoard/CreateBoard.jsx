// Modules
import React from 'react';
import { connect } from "react-redux";
import {TabContent, TabPane, Nav, NavItem, NavLink, Modal,ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input, Alert, Card, CardBody, CardText} from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from "@fortawesome/free-solid-svg-icons/index";

// Css
import './CreateBoard.css';

// Actions & Constant
import {createBoard, getBoardsUser} from "../../requests/boards";
import {addBoard, fetchBoards} from "../../actions/boardActions";
import {AddMembersCreateBoard} from "./AddMembersCreateBoard/AddMembersCreateBoard";
import {ShowAddMembersCreateBoard} from "./ShowAddMembersCreateBoard/ShowAddMembersCreateBoard";
import {fetchMembersCreationBoard} from "../../actions/membersActions";
import {addMember} from "../../requests/memberships";

export class CreateBoardToBeConnected extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: '1',
            'open': false,
            'visible': false,
            'name': '',
            'idOrganization': null,
            'desc': '',
            'memberships': [],
            'color': '#000000',
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    openModal (){
        this.setState({ open: true })
    }

    closeModal () {
        this.props.fetchMembersCreationBoard([])
        this.setState({
            activeTab: '1',
            open: false,
            'visible': false,
            'name':'',
            'idOrganization': null,
            'desc':'',
            'memberships': [],
            'color':'#000000',
            'idBoard':"",
        })
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        this.setState({
            [ name ]: value,
        });
    };

    async submitForm(e) {
        e.preventDefault();
        const name = this.state.name,
            desc = this.state.desc,
            idOrganization = this.state.idOrganization,
            memberships = this.state.memberships;
        const prefs = {
            'background': this.state.color,
        };
       await createBoard(name, idOrganization, desc, memberships, prefs)
            .then(res => {
                this.setState({idBoard:res.data._id})
                this.props.addBoard(res.data)
            })
            .catch(
                this.setState({
                    visible: true,
                    'name':'',
                    'color':'#000000',
                    'desc':'',
                })
            )
        await this.props.members.map(member => {
            addMember(this.state.idBoard, member._id, 'normal')
        })
        await getBoardsUser(this.props.user.member._id)
            .then(res => {
                this.props.fetchBoards(res.data)
            })
            .catch(error => {
                console.log(error)
            });
        this.closeModal()
    };

    onDismiss = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        const { name, color, desc } = this.state;
        return (
            <div>
                <Card className="addBoard" onClick={() => this.openModal()}>
                    <CardBody>
                        <CardText>
                            <FontAwesomeIcon icon={faPlus} size="1x"/>
                        </CardText>
                        <CardText>
                            Create a board
                        </CardText>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.open} toggle={() =>this.closeModal() } centered={true}>
                    <ModalHeader toggle={() =>this.closeModal()}>Add a board</ModalHeader>
                    <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                        <ModalBody className="ModalBodyCreateBoard">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink style={{cursor: 'pointer'}}
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}
                                    >
                                        Informations
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{cursor: 'pointer'}}
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}
                                    >
                                        Members
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Alert color="danger" isOpen={this.state.visible} toggle={() =>this.onDismiss() }>
                                        The board was not able to be created
                                    </Alert>
                                    <Row>
                                        <Col sm="12" md="8">
                                            <FormGroup>
                                                <Label>Name</Label>
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter a name"
                                                    value={ name }
                                                    required={true}
                                                    onChange={ (e) => this.handleChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="2">
                                            <FormGroup>
                                                <Label for="exampleColor">Color</Label>
                                                <Input
                                                    type="color"
                                                    name="color"
                                                    id="exampleColor"
                                                    placeholder="color placeholder"
                                                    value={ color }
                                                    required={true}
                                                    onChange={ (e) => this.handleChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Description</Label>
                                                <Input
                                                    type="textarea"
                                                    name="desc"
                                                    id="exampleText"
                                                    placeholder="Enter a description"
                                                    value={ desc }
                                                    required={true}
                                                    onChange={ (e) => this.handleChange(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </TabPane>

                                <TabPane tabId="2">
                                    <ShowAddMembersCreateBoard/>
                                    <AddMembersCreateBoard/>
                                </TabPane>
                            </TabContent>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={() =>this.closeModal() }>Return</Button>
                                <Button color="primary" type="submit">Create</Button>
                            </ModalFooter>
                        </Form>
                    </Modal>
            </div>
        )
    }
}

const mapStateToProps = ( state, props ) => ({
    user : state.user,
    members: state.members,
});

const mapDispatchToProps = ( dispatch ) => ({
    addBoard: (res) => dispatch( addBoard(res)),
    fetchMembersCreationBoard: (res) => dispatch( fetchMembersCreationBoard(res)),
    fetchBoards: (res) => dispatch( fetchBoards(res)),
});

export const CreateBoard = connect(
    mapStateToProps,
    mapDispatchToProps,
)( CreateBoardToBeConnected );
