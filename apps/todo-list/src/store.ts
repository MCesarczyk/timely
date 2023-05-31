import { configureStore } from '@reduxjs/toolkit';
import languageReducer from 'common/languages/languageSlice';

export const store = configureStore({
  reducer: {
    languages: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
