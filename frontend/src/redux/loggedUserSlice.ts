import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
const LOGGED_USER_ID = "loggedUser";
interface loggedUserState {
  loggedUserId: string | null;

}

const initialState: loggedUserState = {
    loggedUserId : localStorage.getItem(LOGGED_USER_ID),
};

export const loggedUserSlice = createSlice({
  name: LOGGED_USER_ID,
  initialState,
  reducers: {
    logUserIn: (state, action: PayloadAction<string>) => {
      state.loggedUserId = action.payload;
      localStorage.setItem(LOGGED_USER_ID, action.payload);
    },
    logUserOut: (state) => {
      state.loggedUserId = null;
      localStorage.removeItem(LOGGED_USER_ID);
    },
    
  },
});

export const { logUserIn, logUserOut } = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
