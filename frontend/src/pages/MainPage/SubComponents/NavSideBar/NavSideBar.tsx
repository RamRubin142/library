import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NavSideBar.module.css";


export const NavSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className={styles.navBar}>
      <Box className={styles.buttonGroup}>
        <button
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
        </button>
        <button
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
        </button>
        <button
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
        </button>
      </Box>
    </Box>
  );
};
