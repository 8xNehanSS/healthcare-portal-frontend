import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  value: boolean;
}

const initialState: ThemeState = {
  value: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDark: (state) => {
      state.value = true;
    },
    setLight: (state) => {
      state.value = false;
    },
  },
});

export const { setDark, setLight } = themeSlice.actions;
export default themeSlice.reducer;
