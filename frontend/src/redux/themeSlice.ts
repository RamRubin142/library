import { createSlice } from "@reduxjs/toolkit";
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
    ChangeColorMode: (state) => {
      state.colorMode = state.colorMode == "light" ? "dark" : "light";
      localStorage.setItem(colorMode, state.colorMode);
    },
    
  },
});

export const { ChangeColorMode } = colorModeSlice.actions;

export default colorModeSlice.reducer;
