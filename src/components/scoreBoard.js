import React, { Component } from "react";
import PropTypes from 'prop-types';
import Result from '../components/result';


class ScoreBoard extends Component {
    static propTypes = {
        game: PropTypes.object
    }
    render() {
        const { game } = this.props;
        const history = game.history;
        const theEnd = game.gameEnd;
        return (
            <div>
                {/* <div className="player-name-wrapper">
                    <span className="player-name">SCOREBOARD</span>
                </div> */}
                <div className="game-section-center-inner-wrapper">
                    <div className="score-board">
                        <div>
                            <span id="user-score">{game.context.playerAScore}</span> : <span id="computer-score">{game.context.playerBScore}</span>
                        </div>
                        <div>
                            <span className="draw-message">Draw: {game.draw}</span>
                        </div>
                    </div>
                    <div>
                        <Result message={game.message} />
                        {
                            theEnd && <div className="alert alert-info">
                                <p>Result of each round played:</p>
                                <ul>
                                    {
                                        history.map((message) => {
                                            return <li><span dangerouslySetInnerHTML={{ __html: message }} /></li>;
                                        })
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default ScoreBoard;
