import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { SECREENS, ACTIONS_SAGA } from './shared';
import Mode from './containers/mode';
import Game from './containers/game';

class App extends Component {
  static propTypes = {
    mode: PropTypes.number,
    screen: PropTypes.number,
    game: PropTypes.object,
    selectMode: PropTypes.func,
    chooseChoice: PropTypes.func,
    playAgain: PropTypes.func
  }
  render() {
    const { mode, screen, game } = this.props;
    return (
      <div>
        {
          screen === SECREENS.SELECT_MODE && <Mode {...this.props} />
        }
        {
          screen === SECREENS.PLAY_GAME && <Game {...this.props} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mode: state.mode,
    screen: state.screen,
    game: state.game
  };
};

const mapDispachToProps = dispatch => {
  return {
    selectMode: (value) => dispatch({ type: ACTIONS_SAGA.SELECT_MODE, value: value }),
    chooseChoice: (value) => dispatch({ type: ACTIONS_SAGA.CHOOSE_CHOICE, value: value }),
    playAgain: () => dispatch({ type: ACTIONS_SAGA.PLAY_AGAIN  })
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);
