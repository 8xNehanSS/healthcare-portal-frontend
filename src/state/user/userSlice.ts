import { createSlice } from "@reduxjs/toolkit";

interface userState {
  value: number;
}

const initialState: userState = {
  value: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDoctor: (state) => {
      state.value = 1;
    },
    setPatient: (state) => {
      state.value = 2;
    },
    setPublic: (state) => {
      state.value = 0;
    },
  },
});

export const { setDoctor, setPatient, setPublic } = userSlice.actions;
export default userSlice.reducer;
