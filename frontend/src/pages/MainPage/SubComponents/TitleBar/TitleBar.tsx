import { Box, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useRef, useState } from "react";
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

  function isupperOverflowActive(event: any) {
    if (!event) return false;
    return (
      event.offsetHeight < event.scrollHeight ||
      event.offsetWidth < event.scrollWidth
    );
  }

  useEffect(() => {
    if (isupperOverflowActive(upperTextRef?.current)) {
      setupperOverflowActive(true);
      return;
    }

    setupperOverflowActive(false);
  }, [isupperOverflowActive]);

  const [upperOverflowActive, setupperOverflowActive] = useState(false);

  const upperTextRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box className={styles.outerBox}>
      <Box className={styles.toolbar}>
        <TitleComponent size={"10vmin"} color={"black"} />
        <Box className={styles.rightContainer}>
          <Box className={styles.userSection}>
            <Box className={styles.userRow}>
              שלום
              <Tooltip
                title={user?.name}
                disableHoverListener={!upperOverflowActive}
              >
                <Box ref={upperTextRef} className={styles.title}>
                  {user?.name}
                </Box>
              </Tooltip>
              !
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

          <button
            className={styles.logoutButton}
            onClick={() => {
              setLogoutPopupOpen(true);
            }}
          >
            התנתק
          </button>

          <Dialog
            open={logoutPopupOpen}
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  height: "100%",
                  maxWidth: "75vmin",
                  maxHeight: "30vmin",
                  backgroundColor: "beige",
                  border: "0.5vmin dashed brown",
                  borderRadius: "0",
                },
              },
            }}
          >
            <DialogTitle className={styles.dialogTitle}>
              האם אתה בטוח שברצונך להתנתק ?
            </DialogTitle>
            <Box className={styles.logoutPopup}>
              <LogoutIcon className={styles.icon} />
              <Box className={styles.dialogButtons}>
                <button className={styles.yesButton} onClick={handleLogout}>
                  כן
                </button>
                <button
                  onClick={() => {
                    setLogoutPopupOpen(false);
                  }}
                  className={styles.noButton}
                >
                  לא
                </button>
              </Box>
            </Box>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};
