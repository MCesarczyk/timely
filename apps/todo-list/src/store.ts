import { configureStore } from '@reduxjs/toolkit';
import languageReducer from 'common/languages/languageSlice';
import tasksReducer from 'app/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    languages: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
