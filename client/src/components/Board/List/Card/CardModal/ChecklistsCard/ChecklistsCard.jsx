import React from "react";
import {Col, Input, Row, Button, Form} from "reactstrap";
import {changeCardDesc} from "../../../../../../requests/cards";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/fontawesome-free-solid';
import {Checklist} from "./Checklist/Checklist";

import './ChecklistsCard.css';

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
            addCheckItem
        } = this.props;
        return (
            <Col>
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
                                    />
                            )}
                        </Col>
                    </Row>
                    : null }
            </Col>
        );
    }

}