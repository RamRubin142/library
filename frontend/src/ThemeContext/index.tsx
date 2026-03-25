import { createContext, useState } from "react";
import { IThemeMode, type IThemeContext } from "./types";

export const ThemeContext = createContext<IThemeContext | null>(null);
export const ThemeContextProvider: React.FunctionComponent<
  React.PropsWithChildren
> = ({ childern }) => {
  const [themeMode, setThemeMode] = useState<IThemeMode>(IThemeMode.LIGHT)
  return <ThemeContext.Provider value={{}}>{childern}</ThemeContext.Provider>;
};
