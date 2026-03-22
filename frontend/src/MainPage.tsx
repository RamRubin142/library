import Box from "@mui/material/Box";
import { NavSideBar } from "./NavSideBar";
import { TitleBar } from "./TitleBar";
import { AuthorControl } from "./authors/AuthorControl";
import { UserControl } from "./users/UserControl";

import { BookControl } from "./books/BookControl";
export const MainPage = () => {
  return (
    <Box>
      <TitleBar />
      <Box sx={{display:'flex', flexDirection : 'row'}}>
        <NavSideBar/>
        <UserControl/>
      </Box>
    </Box>
  );
};
