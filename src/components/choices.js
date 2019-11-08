import React, { Component } from "react";
import PropTypes from 'prop-types';

class Choices extends Component {
    static propTypes = {
        chooseChoice: PropTypes.func,
        choices: PropTypes.array,
        clickable: PropTypes.bool,
        player: PropTypes.string
    }
    render() {
        const { choices, clickable, player } = this.props;
        return (
            <div>
                <div className="player-name-wrapper">
                    <span className="player-name">{player.toUpperCase()}</span>
                </div>
                <div className="choices">
                    {
                        choices && choices.map((img) => {
                            return <div className="choice" id={`${player}-${img.NAME}`} key={`${player}-${img.NAME}`}>
                                <img src={img.URL} alt={img.NAME} onClick={clickable ? () => this.props.chooseChoice(img.NAME) : () => { }} />
                            </div>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Choices;
