import { createSlice } from "@reduxjs/toolkit";
import Data from "../../utils/userData";

interface DataState {
  value: Data;
}

const initialState: DataState = {
  value: new Data(),
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    unsetUser: (state) => {
      state.value = new Data();
    },
  },
});

export const { setUser, unsetUser } = dataSlice.actions;
export default dataSlice.reducer;
