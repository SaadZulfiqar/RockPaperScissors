export const customDelay = 1000;
export const MAX_GAMES_IN_ONE_GO = 5;

export const SECREENS = {
    SELECT_MODE: 1,
    PLAY_GAME: 2
};

export const MODES = {
    USER_VS_COMPUTER: 1,
    COMPUTER_VS_COMPUTER: 2
};

export const MODES_VALUES = {
    [MODES.USER_VS_COMPUTER]: "USER_VS_COMPUTER",
    [MODES.COMPUTER_VS_COMPUTER]: "COMPUTER_VS_COMPUTER"
};

export const ACTIONS_REDUCER = {
    SELECT_MODE: "SELECT_MODE_REDUCER",
    SELECT_SECREEN: "SELECT_SECREEN_REDUCER",
    SELECT_GAME: "SELECT_GAME_REDUCER",
    CHOOSE_CHOICE: "CHOOSE_CHOICE_REDUCER",
    PLAY_AGAIN: "PLAY_AGAIN_REDUCER"
};

export const ACTIONS_SAGA = {
    SELECT_MODE: "SELECT_MODE_SAGA",
    SELECT_SECREEN: "SELECT_SECREEN_SAGA",
    CHOOSE_CHOICE: "CHOOSE_CHOICE_SAGA",
    PLAY_AGAIN: "PLAY_AGAIN_SAGA"
};

export const OPTIONS = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSOR: "scissor"
};

export const checkOption = (option) => {
    return OPTIONS[option.toUpperCase()];
};

export const RESULTS = {
    WIN: "win",
    LOST: "defeat",
    DRAW: "draw"
};

const IMAGES = [
    { NAME: OPTIONS.ROCK, URL: "images/rock.png", SELECTED: false },
    { NAME: OPTIONS.PAPER, URL: "images/paper.png", SELECTED: false },
    { NAME: OPTIONS.SCISSOR, URL: "images/scissors.png", SELECTED: false }
];

export const GAME = {
    [MODES.USER_VS_COMPUTER]: {
        playerA: "User",
        playerAScore: 0,
        playerB: "Computer",
        playerBScore: 0,
        playerAImages: IMAGES,
        playerBImages: IMAGES
    },
    [MODES.COMPUTER_VS_COMPUTER]: {
        playerA: "Computer A",
        playerAScore: 0,
        playerB: "Computer B",
        playerBScore: 0,
        playerAImages: IMAGES,
        playerBImages: IMAGES
    }
};

// all possible outcomes of the game
const RULES = [
    // paper
    { A: OPTIONS.PAPER, B: OPTIONS.ROCK, RESULT: RESULTS.WIN },
    { A: OPTIONS.PAPER, B: OPTIONS.PAPER, RESULT: RESULTS.DRAW },
    { A: OPTIONS.PAPER, B: OPTIONS.SCISSOR, RESULT: RESULTS.LOST },
    // rock
    { A: OPTIONS.ROCK, B: OPTIONS.ROCK, RESULT: RESULTS.DRAW },
    { A: OPTIONS.ROCK, B: OPTIONS.PAPER, RESULT: RESULTS.LOST },
    { A: OPTIONS.ROCK, B: OPTIONS.SCISSOR, RESULT: RESULTS.WIN },
    // scissor
    { A: OPTIONS.SCISSOR, B: OPTIONS.ROCK, RESULT: RESULTS.LOST },
    { A: OPTIONS.SCISSOR, B: OPTIONS.PAPER, RESULT: RESULTS.WIN },
    { A: OPTIONS.SCISSOR, B: OPTIONS.SCISSOR, RESULT: RESULTS.DRAW }
];

export const getResult = (A, B) => {
    return RULES.find(x => x.A === A && x.B === B);
};

export const getRandomChoice = () => {
    const keys = Object.keys(OPTIONS)
    return OPTIONS[keys[keys.length * Math.random() << 0]];
};

export const addCSSClasses = (mode, game, optionA, optionB) => {
    if (mode === MODES.COMPUTER_VS_COMPUTER) {
        let element = document.getElementById(`${game.context.playerA}-${optionA}`);
        element.classList.add("choice-bright");
        element.classList.add("choice-force-hover");

        element = document.getElementById(`${game.context.playerB}-${optionB}`);
        element.classList.add("choice-bright");
        element.classList.add("choice-force-hover");
    } else {
        let element = document.getElementById(`${game.context.playerB}-${optionB}`);
        element.classList.add("choice-bright");
        element.classList.add("choice-force-hover");
    }
};

export const removeCSSClasses = (mode, game, optionA, optionB) => {
    if (mode === MODES.COMPUTER_VS_COMPUTER) {
        let element = document.getElementById(`${game.context.playerA}-${optionA}`);
        element.classList.remove("choice-bright");
        element.classList.remove("choice-force-hover");

        element = document.getElementById(`${game.context.playerB}-${optionB}`);
        element.classList.remove("choice-bright");
        element.classList.remove("choice-force-hover");
    } else {
        let element = document.getElementById(`${game.context.playerB}-${optionB}`);
        element.classList.remove("choice-bright");
        element.classList.remove("choice-force-hover");
    }
};

export const getMessageHtml = (type, result, message) => {
    let className = "alert"; let header = "";
    if (type === 1) {
        header = "ROUND END - ";
    } else if (type === 2) {
        header = "GAME END - ";
    }
    if (result === RESULTS.WIN) {
        className = `${className} alert-success`;
    } else if (result === RESULTS.LOST) {
        className = `${className} alert-danger`;
    } else if (result === RESULTS.DRAW) {
        className = `${className} alert-warning`;
    } else {
        className = `${className} alert-success`;
    }

    return `<div class="${className}"><strong>${header}${result.toUpperCase()}!!!</strong><p>${message}</p></div>`;
};

export const defaultState = {
    game: {
        draw: 0,
        played: 0,
        context: {},
        message: getMessageHtml(3, "Play", "Let's play the game..."),
        history: [],
        gameEnd: false
    },
    mode: null,
    screen: SECREENS.SELECT_MODE
};