import { configureStore } from "@reduxjs/toolkit";
import authorReducer from "./authorSlice";
import bookReducer from "./bookSlice";
import userReducer from "./userSlice";
import pageReducer from "./pageSlice";
import currentUserSlice from "./loggedSlice"
export const store = configureStore({
  reducer: {
    author: authorReducer,
    book: bookReducer,
    user: userReducer,
    page: pageReducer,
    currentUser : currentUserSlice,

  },
});

export type RootState = ReturnType<typeof store.getState>;
