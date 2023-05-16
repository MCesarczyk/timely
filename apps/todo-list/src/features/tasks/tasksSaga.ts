import { call, put, delay, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { saveTasksInLocalStorage } from './tasksLocalStorage';
import { fetchExampleTasks, setTasks, selectTasks, setTasksState } from './tasksSlice';
import { getExampleTasks } from './getExampleTasks';
import { Task } from 'types';

function* fetchExampleTasksHandler() {
  try {
    yield put(setTasksState('loading'));
    yield delay(2000);
    const exampleTasks: Task[] = yield call(getExampleTasks);
    yield put(setTasks(exampleTasks));
    yield put(setTasksState('done'));
  } catch (error) {
    yield call(alert, 'Sorry...unable to fetch data!');
  }
}

function* saveTasksInLocalStorageHandler() {
  const tasks: Task[] = yield select(selectTasks);
  yield call(saveTasksInLocalStorage, tasks);
}

export function* tasksSaga() {
  yield takeLatest(fetchExampleTasks.type, fetchExampleTasksHandler);
  yield takeEvery('*', saveTasksInLocalStorageHandler);
}
