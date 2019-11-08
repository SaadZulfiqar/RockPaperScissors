import React, { Component } from "react";
import PropTypes from 'prop-types';
import { MODES, MAX_GAMES_IN_ONE_GO } from '../shared';

class Mode extends Component {
    static propTypes = {
        mode: PropTypes.number,
        selectMode: PropTypes.func
    }
    render() {
        return (
            <div>
                <p id="action-message" className="no-margin">Developer Assignment - Rock Paper Scissors </p>
                <p id="action-message" className="no-margin">Select Mode</p>
                <div className="mode-buttons">
                    <button className="btn btn-light" onClick={() => this.props.selectMode(MODES.USER_VS_COMPUTER)}>User vs Computer</button>
                </div>
                <div className="mode-buttons">
                    <button className="btn btn-light" onClick={() => this.props.selectMode(MODES.COMPUTER_VS_COMPUTER)}>Computer vs Computer</button>
                </div>
                <div className="rules">
                    <div className="alert alert-info">
                        <div>
                            <strong>Rules:</strong>
                            <ul>
                                <li>Scissor beats paper.</li>
                                <li>Paper beats rock.</li>
                                <li>Rock beats scissor.</li>
                            </ul>
                        </div>
                        <div>
                            <strong>Note:</strong>
                            <ul>
                                <li>There are {MAX_GAMES_IN_ONE_GO} rounds per game.</li>
                                <li>It uses e6 features so please use latest browsers to run the game.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mode;
