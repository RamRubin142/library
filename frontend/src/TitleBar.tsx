import { Box, Toolbar, Typography, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import type { BookInterface } from "./models/books/BookInterface";
import type { UserInterface } from "./models/users/UserInterface";
import { useNavigate } from "react-router-dom";
export const TitleBar = () => {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("loggedUser");

  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const { data: user } = useQuery<UserInterface>({
    queryKey: ["user", currentUserId],
    queryFn: () =>
      fetch("http://localhost:4000/users/" + currentUserId).then((res) =>
        res.json()
      ),
  });
  const { data: favBook } = useQuery<BookInterface>({
    queryKey: ["favBook", user?.favorite],
    queryFn: () =>
      fetch("http://localhost:4000/books/" + user?.favorite).then((res) =>
        res.json()
      ),
  });

  const handleLogout = () => {
    localStorage.setItem("loggedUser", "")
    setLogoutPopupOpen(false);
    navigate("/login");
  };

  return (
    <Box sx={{ border: 1 }}>
      <Toolbar sx={{ bgcolor: "white" }}>
        <Typography
          color="black"
          variant="h4"
          component="div"
          sx={{ flexGrow: 2 }}
        >
          הספריה
        </Typography>
        <Box sx={{ flexDirection: "column", flexGrow: 1 }}>
          <Typography color="black">שלום {user?.name}!</Typography>
          <Typography variant="caption" color="black">
            הספר האהוב עליך הוא {favBook?.name}
          </Typography>
        </Box>
        <Button
          sx={{
            bgcolor: "orange",
            color: "white",
            width: "100px",
            borderRadius: "0",
            fontSize: "13pt",
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
            <Button
              onClick={handleLogout}
            >
              כן
            </Button>
            <Button
              onClick={() => {
                setLogoutPopupOpen(false);
              }}
            >
              לא
            </Button>
          </Box>
        </Dialog>
      </Toolbar>
    </Box>
  );
};
