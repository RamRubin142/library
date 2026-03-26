import { LoginPage } from "./LoginPage";
import { MainPage } from "./MainPage";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { UserControl } from "./users/UserControl";
import { BookControl } from "./books/BookControl";
import { AuthorControl } from "./authors/AuthorControl";
export const App = () => {
  const PrivateRoutes = () => {
    let auth = localStorage.getItem("loggedUser") != "";
    return auth ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <div>
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
  );
};
