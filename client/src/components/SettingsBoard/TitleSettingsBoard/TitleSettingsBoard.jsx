// Modules
import React from 'react';
import {history} from "../../../history";
import {Button, Row, Col} from 'reactstrap';

// Css...
import './TitleSettingsBoard.css';

// Actions & Constant

export class TitleSettingsBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    goToPageBoard = () => {
        history.push('/board/' + this.props.boardId + '/' + this.props.boardName)
    }

    render() {
        return (
            <div className="TitleSettingsBoard">
                <Row>
                    <Col>
                        <div className="float-left">
                            <h3>{'Board '+this.props.boardName+' - Settings'}</h3>
                        </div>
                        <Button className="float-right" color="secondary" onClick={() => this.goToPageBoard()}>Back</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
