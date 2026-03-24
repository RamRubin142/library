import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthorState {
  selectedAuthorId: string | null;
  editedAuthorId: string;
  editedAuthorText: string;
}

const initialState: AuthorState = {
  selectedAuthorId: "",
  editedAuthorId: "",
  editedAuthorText: "",
};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    selectAuthor: (state, action: PayloadAction<string>) => {
      state.selectedAuthorId = action.payload;
    },
    setAuthorIsEdited: (
      state,
      action: PayloadAction<{ authorId: string; authorText: string }>
    ) => {
      state.editedAuthorId = action.payload.authorId;
      state.editedAuthorText = action.payload.authorText;
    },
  },
});

export const { selectAuthor } = authorSlice.actions;

export default authorSlice.reducer;
