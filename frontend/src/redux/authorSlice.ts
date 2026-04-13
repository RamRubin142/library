import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthorState {
  selectedAuthorId: string | null;
  editedAuthorId: string | null;
  editedAuthorText: string | null;
}

const initialState: AuthorState = {
  selectedAuthorId: null,
  editedAuthorId: null,
  editedAuthorText: null,
};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    selectAuthor: (state, action: PayloadAction<string | null>) => {
      state.selectedAuthorId = action.payload;
    },
    setAuthorIsEdited: (
      state,
      action: PayloadAction<{ authorId: string | null; authorText: string | null}>
    ) => {
      state.editedAuthorId = action.payload.authorId;
      state.editedAuthorText = action.payload.authorText;
    },
  },
});

export const { selectAuthor, setAuthorIsEdited } = authorSlice.actions;

export default authorSlice.reducer;
