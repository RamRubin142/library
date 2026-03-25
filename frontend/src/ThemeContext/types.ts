export enum IThemeMode {
    LIGHT = "light",
    DARK = "dark",
    SYSTEM = "system"
}
export interface IThemeContext {
    themeMode : IThemeMode;
}