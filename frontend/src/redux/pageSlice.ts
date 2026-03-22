import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  selectedSection: string;
}

const initialState: PageState = {
  selectedSection: "USERS",
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    selectSection: (state, action: PayloadAction<string>) => {
      state.selectedSection = action.payload;
    },
  },
});

export const { selectSection } = pageSlice.actions;

export default pageSlice.reducer;
