import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  selectedUserId: string | null;
  editedUserId: string;
  editedUserText: string;
}

const initialState: UserState = {
  selectedUserId: "",
  editedUserId: "",
  editedUserText: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload;
    },    
    setUserIsEdited: (
      state,
      action: PayloadAction<{ userId: string; userText: string }>
    ) => {
      state.editedUserId = action.payload.userId;
      state.editedUserText = action.payload.userText;
    },
  },
    
  },
);

export const { selectUser } = UserSlice.actions;

export default UserSlice.reducer;
