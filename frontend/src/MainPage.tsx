import Box from "@mui/material/Box";
import { NavSideBar } from "./NavSideBar";
import { TitleBar } from "./TitleBar";
import { Outlet } from "react-router-dom";
export const MainPage = () => {
  return (
    <Box>
      <TitleBar />
      <Box sx={{display:'flex', flexDirection : 'row'}}>
        <NavSideBar/>
        <Outlet />
      </Box>
    </Box>
  );
};
