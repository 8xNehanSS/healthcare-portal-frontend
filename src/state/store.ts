import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import loaderReducer from "./loader/loaderSlice";
import userReducer from "./user/userSlice";
import logReducer from "./logged/logSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loader: loaderReducer,
    user: userReducer,
    log: logReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
