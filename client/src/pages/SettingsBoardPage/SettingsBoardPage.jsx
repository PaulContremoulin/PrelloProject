// Modules
import React from 'react';
import { connect } from 'react-redux';
import {Container} from 'reactstrap';

// Css...
import './SettingsBoardPage.css';
import {SettingsBoard} from "../../components/SettingsBoard/SettingsBoard";
import * as qs from "query-string";
import {checkToken} from "../../requests/resetPswd";

// Actions & Constant

export class SettingsBoardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="SettingsBoardPage">
                <SettingsBoard/>
            </div>
        )
    }

}
