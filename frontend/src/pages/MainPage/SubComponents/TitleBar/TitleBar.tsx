import { Box, Toolbar, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import type { BookInterface } from "@models/books/BookInterface";
import type { UserInterface } from "@models/users/UserInterface";
import { getUserById } from "@api/users.api";
import { getBookById } from "@api/books.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./TitleBar.module.css";
import { logUserOut } from "@redux/loggedUserSlice";
import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import { TitleComponent } from "@components/TitleComponent/TitleComponent";
import LogoutIcon from "@mui/icons-material/Logout";
export const TitleBar = () => {
  const currentUserId = useSelector(
    (state: RootState) => state.loggedUser.loggedUserId,
  );
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const { data: user } = useQuery<UserInterface>({
    queryKey: ["user", currentUserId],
    queryFn: () => getUserById(currentUserId),
  });
  const { data: favBook } = useQuery<BookInterface>({
    queryKey: ["favBook", user?.favorite],
    queryFn: () => getBookById(user?.favorite),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logUserOut());
    setLogoutPopupOpen(false);
    navigate("/login");
  };

  return (
    <Box className={styles.outerBox}>
      <Toolbar className={styles.toolbar}>
        <TitleComponent size={"40pt"} color={"black"} />
        <Box className={styles.rightContainer}>
          <Box className={styles.userSection}>
            <Box className={styles.userRow}>
              שלום
              <Box className={styles.title}>{user?.name}</Box>!
            </Box>

            {favBook?._id ? (
              <Box className={`${styles.favText} ${styles.title}`}>
                הספר האהוב עליך הוא {favBook?.name}
              </Box>
            ) : (
              <Box className={`${styles.favText} ${styles.title}`}>
                אין לך ספר אהוב
              </Box>
            )}
          </Box>

          <Button
            className={styles.logoutButton}
            onClick={() => {
              setLogoutPopupOpen(true);
            }}
          >
            התנתק
          </Button>

          <Dialog open={logoutPopupOpen}> 
            <DialogTitle>האם אתה בטוח שברצונך להתנתק ?</DialogTitle>
            <Box className={styles.logoutPopup}>
              <LogoutIcon />
              <Box className={styles.dialogButtons}>
                <Button className={styles.yesButton} onClick={handleLogout}>
                  כן
                </Button>
                <Button
                  onClick={() => {
                    setLogoutPopupOpen(false);
                  }}
                  className={styles.noButton}
                >
                  לא
                </Button>
              </Box>
            </Box>
          </Dialog>
        </Box>
      </Toolbar>
    </Box>
  );
};
