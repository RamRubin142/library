import { Box, Toolbar, Typography, Button } from "@mui/material";
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
    <Box sx={{ border: 1 }}>
      <Toolbar
        sx={{
          bgcolor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            color="black"
            variant="h4"
            component="div"
            sx={{ flexGrow: 2 }}
          >
            הספריה
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ flexDirection: "column", flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                fontSize: "14pt",
                fontFamily: "Arial, sans-serif",
              }}
            >
              שלום<Box className={styles.title}>{user?.name}</Box>!
            </Box>
            {favBook?._id ? (
              <Typography
                sx={{ fontSize: "10pt" }}
                color="black"
                className={styles.title}
              >
                הספר האהוב עליך הוא {favBook?.name}
              </Typography>
            ) : (
              <Typography
                sx={{ fontSize: "10pt" }}
                color="black"
                className={styles.title}
              >
                אין לך ספר אהוב
              </Typography>
            )}
          </Box>
          <Button
            sx={{
              bgcolor: "orange",
              color: "white",
              width: "100px",
              borderRadius: "0",
              fontSize: "13pt",
              marginLeft: "80px",
            }}
            onClick={() => {
              setLogoutPopupOpen(true);
            }}
          >
            התנתק
          </Button>
          <Dialog open={logoutPopupOpen}>
            <DialogTitle>האם אתה בטוח שברצונך להתנתק ?</DialogTitle>
            <Box>
              <Button onClick={handleLogout}>כן</Button>
              <Button
                onClick={() => {
                  setLogoutPopupOpen(false);
                }}
              >
                לא
              </Button>
            </Box>
          </Dialog>
        </Box>
      </Toolbar>
    </Box>
  );
};
