import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: 'EN',
};

const languageSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    changeLanguage: (state, { payload: chosenLanguage }) => {
      state.language = chosenLanguage;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export const selectLanguage = (state: RootState) => state.languages.language;
export default languageSlice.reducer;
