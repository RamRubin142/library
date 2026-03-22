import Button from "@mui/material/Button";
import { Box, ButtonGroup } from "@mui/material";

const buttonStyle = {
  backgroundColor: "white",
  color: "black",
};


export const NavSideBar = () => {
  return (
    <Box sx={{border : 1, height : '100vh', }}>
      <ButtonGroup orientation="vertical" aria-label="Vertical button group">
        <Button sx={buttonStyle}>ניהול משתמשים</Button>
        <Button sx={buttonStyle}>ניהול ספרים</Button>
        <Button sx={buttonStyle}>ניהול סופרים</Button>
      </ButtonGroup>
    </Box>
  );
};
