import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import languageReducer from 'common/languages/languageSlice';
import tasksReducer from 'features/tasks/tasksSlice';
import { tasksSaga } from 'features/tasks/tasksSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    languages: languageReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(tasksSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
