import { configureStore } from "@reduxjs/toolkit";
import authorReducer from "./authorSlice";
import bookReducer from "./bookSlice";
import userReducer from "./userSlice";
import loggedUserReducer from "./loggedUserSlice";
export const store = configureStore({
  reducer: {
    author: authorReducer,
    book: bookReducer,
    user: userReducer,
    loggedUser: loggedUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
