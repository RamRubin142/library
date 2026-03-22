import { Box } from "@mui/material";
import { UnloggedBook } from "./UnloggedBook";
import styles from "./style/OneUsersControl.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useQuery} from "@tanstack/react-query";
export const UnloggedOneUserControl = () => {
  const selectedUserId = useSelector(
    (state: RootState) => state.user.selectedUserId
  );
  interface BookInterface {
    _id: string;
    name: string;
    author: string;
  }
  interface UserInterface {
    _id: string;
    name: string;
    books: BookInterface[];
    favorite: string;
  }
  const { data: user } = useQuery<UserInterface>({
    queryKey: ["user", selectedUserId],
    queryFn: () =>
      fetch("http://localhost:4000/users/" + selectedUserId).then((res) =>
        res.json()
      ),
  });

  
  if (!user || !selectedUserId || Array.isArray(user)) {
    return (
      <Box
        sx={{ border: 1, height: "100vh", padding: "20px", width: "50%" }}
      ></Box>
    );
  }

  return (
    <Box sx={{ border: 1, height: "100vh", padding: "20px", width: "50%" }}>
      <div className={styles.topBar}>
        <div>
          הספרים שקרא <b>{user.name}</b> :
        </div>
      </div>
      <div className={styles.booksArea}>
        {user.books.map((book) => (
          <UnloggedBook
            key={book._id}
            id={book._id}
            name={book.name}
            author={book.author}
          />
        ))}
      </div>
    </Box>
  );
};
