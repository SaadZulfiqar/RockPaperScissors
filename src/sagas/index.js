import { all } from 'redux-saga/effects';
import { sharedSagas } from './shared';

function *watchAll() {
    yield all([
        ...sharedSagas,
    ]);
  }

export default watchAll;
