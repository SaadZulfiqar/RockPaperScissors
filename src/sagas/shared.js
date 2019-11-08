
import { takeLatest, put, select, call, delay } from "redux-saga/effects";
import { getMessageHtml, customDelay, GAME, MODES, ACTIONS_REDUCER, ACTIONS_SAGA, SECREENS, getResult, getRandomChoice, RESULTS, MAX_GAMES_IN_ONE_GO, addCSSClasses, removeCSSClasses } from '../shared';

// slectors
const getGame = (state) => state.game;
const getMode = (state) => state.mode;

function* playAgain() {
    const game = yield select(getGame);
    game.context.playerAScore = 0;
    game.context.playerBScore = 0;
    yield put({
        type: ACTIONS_REDUCER.PLAY_AGAIN,
        value: {
            context: game.context,
            played: 0,
            message: getMessageHtml(3, "Play", "Let's play the game again..."),
            draw: 0
        }
    });
    const mode = yield select(getMode);
    // for computer vs computer game
    if (mode === MODES.COMPUTER_VS_COMPUTER) {
        yield delay(customDelay);
        yield call(chooseChoice);
    }
}

function* selectMode(action) {
    yield put({ type: ACTIONS_REDUCER.SELECT_MODE, value: action.value });
    yield put({ type: ACTIONS_REDUCER.SELECT_SECREEN, value: SECREENS.PLAY_GAME });
    if (action.value === MODES.USER_VS_COMPUTER) {
        yield put({ type: ACTIONS_REDUCER.SELECT_GAME, value: GAME[MODES.USER_VS_COMPUTER] });
    } else if (action.value === MODES.COMPUTER_VS_COMPUTER) {
        yield put({ type: ACTIONS_REDUCER.SELECT_GAME, value: GAME[MODES.COMPUTER_VS_COMPUTER] });
        yield delay(customDelay);
        yield call(chooseChoice);
    }
}

function* chooseChoice(action) {
    const game = yield select(getGame);
    let theEnd = false;
    // if there are still games to be played
    if (game.played < MAX_GAMES_IN_ONE_GO) {
        const mode = yield select(getMode);
        const optionA = !action ? getRandomChoice() : action.value
        const optionB = getRandomChoice();

        const result = getResult(optionA, optionB);
        game.played += 1; // increment games played
        let messageA = `${game.context.playerA}'s ${optionA}`;
        let messageB = `${game.context.playerB}'s ${optionB}`;
        let message = ``;

        // message result
        if (result.RESULT === RESULTS.WIN) {
            game.context.playerAScore += 1; // player A won
            message = getMessageHtml(1, RESULTS.WIN, `${messageA} beats ${messageB}`);
        }
        else if (result.RESULT === RESULTS.LOST) {
            game.context.playerBScore += 1; // player B won
            message = getMessageHtml(1, RESULTS.LOST, `${messageB} beats ${messageA}`);
        }
        else if (result.RESULT === RESULTS.DRAW) { // draw
            game.draw += 1;
            message = getMessageHtml(1, RESULTS.DRAW, `${messageA} draws with ${messageB}`);
        }

        addCSSClasses(mode, game, optionA, optionB);
        yield put({
            type: ACTIONS_REDUCER.CHOOSE_CHOICE,
            value: {
                context: game.context,
                played: game.played,
                message: message,
                draw: game.draw
            }
        });

        yield delay(customDelay);
        removeCSSClasses(mode, game, optionA, optionB);

        // for computer vs computer game
        if (mode === MODES.COMPUTER_VS_COMPUTER) {
            yield call(chooseChoice);
        } else {
            if (MAX_GAMES_IN_ONE_GO - game.played === 0) {
                theEnd = true;
            }
        }
    } else {
        theEnd = true;
    }

    // this is the end of the turns
    if (theEnd) {
        let message = "";
        if (game.context.playerAScore === game.context.playerBScore) {
            message = getMessageHtml(2, RESULTS.DRAW, `It's a draw.`);
        } else if (game.context.playerAScore > game.context.playerBScore) {
            message = getMessageHtml(2, RESULTS.WIN, `It's a win for ${game.context.playerA}.`);
        } else if (game.context.playerAScore < game.context.playerBScore) {
            message = getMessageHtml(2, RESULTS.LOST, `It's a win for ${game.context.playerB}.`);
        }

        yield put({
            type: ACTIONS_REDUCER.CHOOSE_CHOICE,
            value: {
                context: game.context,
                played: game.played,
                message: message,
                draw: game.draw
            }
        });
    }
}

export const sharedSagas = [
    takeLatest(ACTIONS_SAGA.SELECT_MODE, selectMode),
    takeLatest(ACTIONS_SAGA.CHOOSE_CHOICE, chooseChoice),
    takeLatest(ACTIONS_SAGA.PLAY_AGAIN, playAgain)
];