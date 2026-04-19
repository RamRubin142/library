import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NavSideBar.module.css";


export const NavSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className={styles.navBar}>
      <Box className={styles.buttonGroup}>
        <Button
          className={
            location.pathname == "/home/users"
              ? styles.selectedButtonStyle
              : styles.buttonStyle
          }
          sx={{bgcolor : location.pathname == "/home/users" ? "action.selected" : "background.default", color : "text.primary"}}
          
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
          sx={{bgcolor : location.pathname == "/home/books" ? "action.selected" : "background.default", color : "text.primary"}}
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
          sx={{bgcolor : location.pathname == "/home/authors" ? "action.selected" : "background.default", color : "text.primary"}}
        >
          ניהול סופרים
        </Button>
      </Box>
    </Box>
  );
};
