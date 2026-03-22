import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthorState {
  selectedAuthorId : string | null;
}

const initialState: AuthorState = {
  selectedAuthorId : "",
};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    selectAuthor: (state, action: PayloadAction<string>) => {
      state.selectedAuthorId = action.payload;
    },
  },
});

export const { selectAuthor } = authorSlice.actions;

export default authorSlice.reducer;
