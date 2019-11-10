import { ACTIONS_REDUCER, defaultState } from '../shared';

const reducer = (state = defaultState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case ACTIONS_REDUCER.SELECT_MODE:
            newState.mode = action.value;
            break;

        case ACTIONS_REDUCER.SELECT_SECREEN:
            newState.screen = action.value;
            break;

        case ACTIONS_REDUCER.SELECT_GAME:
            newState.game.context = action.value;
            break;

        case ACTIONS_REDUCER.CHOOSE_CHOICE:
            newState.game = action.value;
            break;

        case ACTIONS_REDUCER.PLAY_AGAIN:
            console.log(action);
            newState.game = action.value;
            break;

        default:
            break;
    }
    return newState;
};

export default reducer;