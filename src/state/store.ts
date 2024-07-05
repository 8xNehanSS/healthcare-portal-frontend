import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import loaderReducer from "./loader/loaderSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
