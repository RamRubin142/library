import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { UserControl } from "./pages/users/UserSection/UserSection";
import { BookControl } from "./pages/books/BookSection/BookSection";
import { AuthorControl } from "./pages/authors/AuthorSection/AuthorSection";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import styles from "./App.module.css";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

export const App = () => {
  const loggedUserId = useSelector(
    (state: RootState) => state.loggedUser.loggedUserId,
  );
  const PrivateRoutes = () => {
    const auth = loggedUserId != null;
    return auth ? <Outlet /> : <Navigate to="/login" />;
  };
  const { theme } = useThemeContext();
  return (


        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={styles.font}>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<MainPage />}>
                  <Route path="users" element={<UserControl />} />
                  <Route path="books" element={<BookControl />} />
                  <Route path="authors" element={<AuthorControl />} />
                  <Route index element={<Navigate to="users" />} />
                </Route>
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </ThemeProvider>


  );
};
