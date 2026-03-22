import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookState {
  selectedBookId: string | null;
}

const initialState: BookState = {
  selectedBookId: "",
};

export const BookSlice = createSlice({
  name: "Book",
  initialState,
  reducers: {
    selectBook: (state, action: PayloadAction<string>) => {
      state.selectedBookId = action.payload;
    },
  },
});

export const { selectBook } = BookSlice.actions;

export default BookSlice.reducer;
