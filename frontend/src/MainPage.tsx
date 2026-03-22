import Box from "@mui/material/Box";
import { NavSideBar } from "./NavSideBar";
import { TitleBar } from "./TitleBar";
import { AuthorControl } from "./authors/AuthorControl";
import { UserControl } from "./users/UserControl";
import { BookControl } from "./books/BookControl";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
export const MainPage = () => {
  const selectedSection = useSelector(
    (state: RootState) => state.page.selectedSection
  );

  const renderSwitch = () => {
  switch (selectedSection) {
    case "USERS":
      return <UserControl />;
    case "BOOKS":
      return <BookControl />;
    case "AUTHORS":
      return <AuthorControl />;
    default:
      return <UserControl />;
  }
}
  return (
    <Box>
      <TitleBar />
      <Box sx={{display:'flex', flexDirection : 'row'}}>
        <NavSideBar/>
        {renderSwitch()}
      </Box>
    </Box>
  );
};
