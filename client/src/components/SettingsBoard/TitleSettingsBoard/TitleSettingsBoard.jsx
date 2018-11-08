// Modules
import React from 'react';
import {Button, Row, Col} from 'reactstrap';

// Css...
import './TitleSettingsBoard.css';

// Actions & Constant

export class TitleSettingsBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="TitleSettingsBoard">
                <Row>
                    <Col>
                        <div className="float-left">
                            <h3>{'Board '+this.props.boardName+' - Settings'}</h3>
                        </div>
                        <Button className="float-right" color="secondary">Back</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
