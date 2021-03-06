//Module
import React from "react";
import {Col, Row} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/fontawesome-free-solid';

//Css
import './ChecklistsCard.css';

//Action & Component
import {Checklist} from "./Checklist/Checklist";

export class ChecklistsCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { }
    }

    render() {
        const {
            checklists,
            checklistSetName,
            checklistSetPos,
            checkItemSetName,
            checkItemSetPos,
            checkItemSetState,
            checkListDelete,
            checkItemDelete,
            addCheckItem
        } = this.props;
        return (
            <Col className="checklistsCard">
                {(checklists.length > 0) ?
                    <Row>
                        <Col xs="1"><FontAwesomeIcon className='hidden-sm-down' icon={faListUl}/></Col>
                        <Col xs="11">
                            <h5>Checklists</h5>
                            {checklists.map(
                                (checklist, index) =>
                                    <Checklist
                                        checklist={checklist}
                                        key={index}
                                        checklistSetName={checklistSetName}
                                        checklistSetPos={checklistSetPos}
                                        checkItemSetName={checkItemSetName}
                                        checkItemSetPos={checkItemSetPos}
                                        checkItemSetState={checkItemSetState}
                                        checkListDelete={checkListDelete}
                                        addCheckItem={addCheckItem}
                                        checkItemDelete={checkItemDelete}
                                    />
                            )}
                        </Col>
                    </Row>
                    : null }
            </Col>
        );
    }

}