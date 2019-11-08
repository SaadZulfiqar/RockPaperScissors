import React, { Component } from "react";
import PropTypes from 'prop-types';

// components 
import Choices from '../components/choices';
import ScoreBoard from '../components/scoreBoard';
import { MODES } from '../shared';

class Game extends Component {
    static propTypes = {
        game: PropTypes.object,
        chooseChoice: PropTypes.func,
        playAgain: PropTypes.func,
        mode: PropTypes.number
    }
    reloadPage = () => {
        window.location.reload();
    }
    render() {
        const { game, mode } = this.props;
        return (
            <div>
                <div className="game-section">
                    <div className="game-section-left">
                        <Choices player={game.context.playerA} choices={game.context.playerAImages} chooseChoice={this.props.chooseChoice} clickable={mode === MODES.USER_VS_COMPUTER} />
                    </div>
                    <div className="game-section-center">
                        <ScoreBoard game={game} />
                        <div className="mode-buttons">
                            <button className="btn btn-light" onClick={this.reloadPage}>Go to modes</button>
                            <button style={{ 'marginLeft': '10px' }} className="btn btn-light" onClick={this.props.playAgain}>Play again</button>
                        </div>
                    </div>
                    <div className="game-section-right">
                        <Choices player={game.context.playerB} choices={game.context.playerBImages} chooseChoice={this.props.chooseChoice} clickable={false} />
                    </div>

                </div>
            </div>
        );
    }
}

export default Game;
