import Button from "@mui/material/Button";
import { Box, ButtonGroup } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NavSideBar.module.css";


export const NavSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className={styles.navBar}>
      <ButtonGroup orientation="vertical" aria-label="Vertical button group">
        <Button
          className={
            location.pathname == "/home/users"
              ? styles.selectedButtonStyle
              : styles.buttonStyle
          }
          onClick={() => {
            navigate("/home/users");
          }}
        >
          ניהול משתמשים
        </Button>
        <Button
          className={
            location.pathname == "/home/books"
              ? styles.selectedButtonStyle
              : styles.buttonStyle
          }
          onClick={() => {
            navigate("/home/books");
          }}
        >
          ניהול ספרים
        </Button>
        <Button
          className={
            location.pathname == "/home/authors"
              ? styles.selectedButtonStyle
              : styles.buttonStyle
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
