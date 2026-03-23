import { LoginPage } from "./LoginPage";
import { MainPage } from "./MainPage";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
export const App = () => {
  const loggedInUserId = useSelector(
    (state: RootState) => state.currentUser.loggedInUserId
  );
  return <div>{loggedInUserId == "" ? <LoginPage /> : <MainPage />}</div>;
};
