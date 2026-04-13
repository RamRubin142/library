import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookState {
  selectedBookId: string | null;
  editedBookId: string | null;
  editedBookText: string | null;
}

const initialState: BookState = {
  selectedBookId: null,
  editedBookId: null,
  editedBookText: null,
};

export const BookSlice = createSlice({
  name: "Book",
  initialState,
  reducers: {
    selectBook: (state, action: PayloadAction<string | null>) => {
      state.selectedBookId = action.payload;
    },
    setBookIsEdited: (
      state,
      action: PayloadAction<{ bookId: string | null; bookText: string | null }>
    ) => {
      state.editedBookId = action.payload.bookId;
      state.editedBookText = action.payload.bookText;
    },
  },
});

export const { selectBook, setBookIsEdited } = BookSlice.actions;

export default BookSlice.reducer;
