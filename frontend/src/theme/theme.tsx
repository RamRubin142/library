import { type PaletteMode } from "@mui/material";
import * as colors from "@mui/material/colors";

const theme = {
  palette: {
    primary: colors.amber,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: colors.amber,
          divider: colors.brown[700],
          text: {
            primary: colors.grey[900],
            secondary: colors.grey[800],
          },
          background: {
            default: colors.lightGreen[100],
            paper: colors.brown[400],
          },
          action: {
            selected: colors.brown[400],
            disabled: colors.brown[200],
          },
        }
      : {
          primary: colors.amber,
          divider: colors.brown[700],
          text: {
            primary: colors.grey[50],
            secondary: colors.grey[800],
          },
          background: {
            default: colors.teal[800],
            paper:  colors.teal[800],
          },
          action: {
            selected: colors.brown[700],
            disabled: colors.brown[400],
          },
        }),
  },
});

export default theme;
