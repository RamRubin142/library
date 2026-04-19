import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {  type PaletteMode } from "@mui/material";

const colorMode = "colorMode";
interface colorModeState {
  colorMode: PaletteMode;

}

const initialState: colorModeState = {
    colorMode : localStorage.getItem(colorMode) as PaletteMode ?? ("light" as PaletteMode),
};

export const colorModeSlice = createSlice({
  name: colorMode,
  initialState,
  reducers: {
    setColorMode: (state, action: PayloadAction<string>) => {
      state.colorMode = action.payload as PaletteMode;
      localStorage.setItem(colorMode, action.payload);
    },
    
  },
});

export const { setColorMode } = colorModeSlice.actions;

export default colorModeSlice.reducer;
