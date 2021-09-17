import { createSlice } from '@reduxjs/toolkit';
import { ThemeReducerInterface } from '@typings/themeTypes';

import { defaultTheme } from '../../styles/default/theme';
import { RootState } from '../reducers';

export const INITIAL_STATE: ThemeReducerInterface = {
  theme: defaultTheme,
};

const name = 'theme';

const themeSlice = createSlice({
  name,
  initialState: INITIAL_STATE,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;

export default themeSlice.reducer;
