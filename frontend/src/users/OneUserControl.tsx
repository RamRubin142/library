import { Box } from "@mui/material";
import { Book } from "./Book";
import styles from "./style/OneUsersControl.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export const OneUserControl = () => {
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
  const queryClient = useQueryClient();

  const { data: user } = useQuery<UserInterface>({
    queryKey: ["user", selectedUserId],
    queryFn: () =>
      fetch("http://localhost:4000/users/" + selectedUserId).then((res) =>
        res.json()
      ),
  });

  const deleteMutation = useMutation({
    mutationFn: (variables: { bookId: string; userId: string }) => {
      return fetch("http://localhost:4000/users/books/" + variables.userId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: variables.bookId }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: (variables: { bookId: string; userId: string }) => {
      return fetch("http://localhost:4000/users/books/" + variables.userId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: variables.bookId }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
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
        <button className={styles.addButton}>הוסף ספר</button>
      </div>
      <div className={styles.booksArea}>
        {user.books.map((book) => (
          <Book
            key={book._id}
            id={book._id}
            name={book.name}
            author={book.author}
            onDelete={(bookId: string) => {
              deleteMutation.mutate({ userId: selectedUserId, bookId });
            }}
            onFavoriteChange={(bookId: string) => {
              favoriteMutation.mutate({ userId: selectedUserId, bookId });
            }}
            userId={selectedUserId}
            isFavorite={book._id == user.favorite}
          />
        ))}
      </div>
    </Box>
  );
};
