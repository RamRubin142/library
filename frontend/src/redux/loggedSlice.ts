import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoggedState {
  loggedInUserId: string | null;
}

const initialState: LoggedState = {
  loggedInUserId: "69c02c468fb2cb2a25319a90",   
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    logUserIn: (state, action: PayloadAction<string>) => {
      state.loggedInUserId = action.payload;
    },
  },
});

export const { logUserIn } = currentUserSlice.actions;

export default currentUserSlice.reducer;
