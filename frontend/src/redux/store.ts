import { configureStore } from "@reduxjs/toolkit";
import authorReducer from "./authorSlice";
import bookReducer from "./bookSlice";
import userReducer from "./userSlice";
import loggedUserReducer from "./loggedUserSlice";
import  colorModeSlice  from "./themeSlice";
export const store = configureStore({
  reducer: {
    author: authorReducer,
    book: bookReducer,
    user: userReducer,
    loggedUser: loggedUserReducer,
    colorMode: colorModeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
