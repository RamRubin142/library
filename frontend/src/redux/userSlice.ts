import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  selectedUserId: string | null;
  editedUserId: string | null;
  editedUserText: string | null;
}

const initialState: UserState = {
  selectedUserId: null,
  editedUserId: null,
  editedUserText: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },    
    setUserIsEdited: (
      state,
      action: PayloadAction<{ userId: string | null; userText: string | null }>
    ) => {
      state.editedUserId = action.payload.userId;
      state.editedUserText = action.payload.userText;
    },
  },
    
  },
);

export const { selectUser, setUserIsEdited } = UserSlice.actions;

export default UserSlice.reducer;
