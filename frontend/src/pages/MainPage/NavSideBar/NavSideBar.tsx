import Button from "@mui/material/Button";
import { Box, ButtonGroup } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
const buttonStyle = {
  backgroundColor: "white",
  color: "black",
  borderRadius: 0,
};

const selectedButtonStyle = {
  backgroundColor: "blue",
  color: "white",
  borderRadius: 0,
};

export const NavSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ border: 1, height: "85.6vh" }}>
      <ButtonGroup orientation="vertical" aria-label="Vertical button group">
        <Button
          sx={
            location.pathname == "/home/users"
              ? selectedButtonStyle
              : buttonStyle
          }
          onClick={() => {
            navigate("/home/users");
          }}
        >
          ניהול משתמשים
        </Button>
        <Button
          sx={
            location.pathname == "/home/books"
              ? selectedButtonStyle
              : buttonStyle
          }
          onClick={() => {
            navigate("/home/books");
          }}
        >
          ניהול ספרים
        </Button>
        <Button
          sx={
            location.pathname == "/home/authors"
              ? selectedButtonStyle
              : buttonStyle
          }
          onClick={() => {
            navigate("/home/authors");
          }}
        >
          ניהול סופרים
        </Button>
      </ButtonGroup>
    </Box>
  );
};
