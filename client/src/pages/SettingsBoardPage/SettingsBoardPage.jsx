// Modules
import React from 'react';

// Css...
import './SettingsBoardPage.css';

// Actions & Constant
import {SettingsBoard} from "../../components/SettingsBoard/SettingsBoard";

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
