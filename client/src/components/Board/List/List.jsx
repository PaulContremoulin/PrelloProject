import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {
    Card,
    CardTitle,
    Button,
    Input,
    Popover, PopoverBody, Form
} from 'reactstrap';
import styled from 'styled-components';
import {faEllipsisV} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Components & Actions
import {CardComponent} from './Card/Card';
import {AddCard} from './AddCard/AddCard';

// Css
import './List.css';


const ContainerList = styled.div`
  width: 272px;
  margin: 8px;
  display: flex;
  flex-direction: column;
`;
const TitleList = styled.h3``;
const CardList = styled.div`
  flex-grow: 1;
  min-height: 100px;
`;

export class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputNameList: false,
            popoverListOptionOpen: false
        }
    }

    toggleListOptionOpen = () => {
        this.setState({popoverListOptionOpen: !this.state.popoverListOptionOpen})
    };

    handleSubmit = ( event ) => {
        event.preventDefault();
        const newName = event.target.listName.value;
        if (newName !== this.props.list.name) {
            this.props.setNameOfList(newName);
        }
        this.setState({inputNameList: false})
    }

    render() {
        const {
            list, board, labelsBoard, membersBoard,
            moveList, addCard, setNameOfList, setListClosed,
            index,
        } = this.props;
        return (
            <Draggable draggableId={list.id} index={index}>
                {(provided) =>
                    <ContainerList
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="ListContainer"
                    >
                        <CardTitle
                            className="ListTitle"
                            {...provided.dragHandleProps}
                        >
                            {(this.state.inputNameList) ?
                                <Form onSubmit={this.handleSubmit}>
                                <Input
                                    type="text"
                                    name="listName"
                                    required={true}
                                    defaultValue={list.name}
                                />
                                <input hidden={true} type="submit" value="Submit" />
                                </Form>
                                :
                                <div>
                                <span onClick={() => this.setState({inputNameList: true})}>{list.name}</span>
                                <a id={"listOptionsId"+list.id} className="float-right listOption" onClick={ () => this.toggleListOptionOpen() }><FontAwesomeIcon color="grey" icon={faEllipsisV}/></a>
                                </div>
                            }
                            <Popover placement="bottom" isOpen={this.state.popoverListOptionOpen} target={"listOptionsId"+list.id} toggle={this.toggleListOptionOpen}>
                                <PopoverBody>
                                    <Button color="danger" size="sm" onClick={() => setListClosed(true)}>Archive</Button>
                                </PopoverBody>
                            </Popover>
                        </CardTitle>
                        <Droppable
                            droppableId={list.id.toString()}
                            type="card"
                        >{(provided) =>
                            <CardList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <Card className="List" style={{"width": "100%", "margin": "0px"}}>
                                    <div  className="ListScroll">
                                    {(list.cards != null && list.cards.length > 0) ?
                                            list.cards.map((card, index) => (
                                            (card.closed) ?
                                                null
                                                :
                                                <div key={index}>
                                                    <CardComponent
                                                        listId={list.id}
                                                        card={card}
                                                        index={index}
                                                        labelsBoard={labelsBoard}
                                                        membersBoard={membersBoard}

                                                    />
                                                </div>
                                        ))
                                        :
                                        null
                                    }{provided.placeholder}
                                    </div>
                                    <AddCard addCard={(cardName) => addCard(cardName, list.id)}/>
                                </Card>
                            </CardList>
                        }</Droppable>
                    </ContainerList>
                }
            </Draggable>
        )
    }
}
