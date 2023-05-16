import { all } from 'redux-saga/effects';
import { tasksSaga } from 'app/tasks/tasksSaga';

export default function* rootSaga() {
  yield all([tasksSaga()]);
}
