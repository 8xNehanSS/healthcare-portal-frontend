import { createSlice } from "@reduxjs/toolkit";

interface LogState {
  value: boolean;
}

const initialState: LogState = {
  value: false,
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setLogged: (state) => {
      state.value = true;
    },
    unsetLogged: (state) => {
      state.value = false;
    },
  },
});

export const { setLogged, unsetLogged } = logSlice.actions;
export default logSlice.reducer;
