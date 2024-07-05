import { createSlice } from "@reduxjs/toolkit";

interface LoaderState {
  value: boolean;
}

const initialState: LoaderState = {
  value: true,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    endLoader: (state) => {
      state.value = false;
    },
    startLoader: (state) => {
      state.value = true;
    },
  },
});

export const { endLoader, startLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
