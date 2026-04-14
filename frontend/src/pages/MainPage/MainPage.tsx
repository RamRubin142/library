import Box from "@mui/material/Box";
import { NavSideBar } from "./SubComponents/NavSideBar/NavSideBar";
import { TitleBar } from "./SubComponents/TitleBar/TitleBar";
import { Outlet } from "react-router-dom";
export const MainPage = () => {
  return (
    <Box sx={{backgroundColor : "beige"}}>
      <TitleBar />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <NavSideBar />
        <Outlet />
      </Box>
    </Box>
  );
};
