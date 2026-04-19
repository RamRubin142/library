import { createTheme } from "@mui/material";
import { getDesignTokens } from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { ChangeColorMode } from "@redux/themeSlice";
import type { RootState } from "@redux/store";



export const useColorTheme = () => {
  const dispatch = useDispatch();
  const colorMode = useSelector(
    (state: RootState) => state.colorMode.colorMode,
  ); 

  const toggleColorMode = () => {
    dispatch(ChangeColorMode());
  }

  const modifiedTheme = createTheme(getDesignTokens(colorMode));

  return {
    theme: modifiedTheme,
    mode : colorMode,
    toggleColorMode,
  };
};
