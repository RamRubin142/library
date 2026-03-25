import { configureStore } from "@reduxjs/toolkit";
import authorReducer from "./authorSlice";
import bookReducer from "./bookSlice";
import userReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    author: authorReducer,
    book: bookReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
