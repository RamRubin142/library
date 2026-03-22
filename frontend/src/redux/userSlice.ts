import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  selectedUserId: string | null;
}

const initialState: UserState = {
  selectedUserId: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload;
    },
  },
});

export const { selectUser } = UserSlice.actions;

export default UserSlice.reducer;
