import {spawn} from 'redux-saga/effects';

// Sagas
import chargesSaga from './post-comments-sagas';

// Export the root saga
export default function* rootSaga() {
  //  console.log("Hello From Redux-Saga!")

  yield spawn(chargesSaga);
}
