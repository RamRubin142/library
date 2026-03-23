import { Box, Toolbar, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import { useQuery } from "@tanstack/react-query";
import { logUserIn } from "./redux/loggedSlice";
import { useDispatch } from "react-redux";
export const TitleBar = () => {

  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state: RootState) => state.currentUser.loggedInUserId
  );
  interface BookInterface {
    _id: string;
    name: string;
  }
  interface UserInterface {
    _id: string;
    name: string;

    favorite: string;
  }
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

  return (
    <Box sx={{ border: 1,  }}>
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
        <Button sx={{ bgcolor: "green", color: "white" }} onClick={()=>{dispatch(logUserIn(""))}}>התנתק</Button>
      </Toolbar>
    </Box>
  );
};
