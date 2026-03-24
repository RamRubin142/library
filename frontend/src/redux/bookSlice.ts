import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookState {
  selectedBookId: string | null;
  editedBookId: string;
  editedBookText: string;
}

const initialState: BookState = {
  selectedBookId: "",
  editedBookId: "",
  editedBookText: "",
};

export const BookSlice = createSlice({
  name: "Book",
  initialState,
  reducers: {
    selectBook: (state, action: PayloadAction<string>) => {
      state.selectedBookId = action.payload;
    },
    setBookIsEdited: (
      state,
      action: PayloadAction<{ bookId: string; bookText: string }>
    ) => {
      state.editedBookId = action.payload.bookId;
      state.editedBookText = action.payload.bookText;
    },
  },
});

export const { selectBook } = BookSlice.actions;

export default BookSlice.reducer;
