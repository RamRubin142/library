import { Box, Popper } from "@mui/material";
import { Book } from "./Book";
import styles from "./style/OneUsersControl.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
export const OneUserControl = () => {
  const selectedUserId = useSelector(
    (state: RootState) => state.user.selectedUserId
  );
  interface BookInterface {
    _id: string;
    name: string;
    author: {_id :string, name: string}
  }
  interface UserInterface {
    _id: string;
    name: string;
    books: BookInterface[];
    favorite: string;
  }
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleAddBookButton = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleAddBook = (bookId: string) => {
    if (selectedUserId) {
      addBookMutation.mutate({ bookId, userId: selectedUserId });
      setAnchorEl(null);
    }
  };

  const { data: user } = useQuery<UserInterface>({
    queryKey: ["user", selectedUserId],
    queryFn: () =>
      fetch("http://localhost:4000/users/" + selectedUserId).then((res) =>
        res.json()
      ),
  });

  const { data: books } = useQuery<BookInterface[]>({
    queryKey: ["books"],
    queryFn: () =>
      fetch("http://localhost:4000/books/").then((res) => res.json()),
  });

  const listOfBookIds = user?.books?.map((book) => book._id);

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

  const addBookMutation = useMutation({
    mutationFn: (variables: { bookId: string; userId: string }) => {
      return fetch("http://localhost:4000/users/books/" + variables.userId, {
        method: "POST",
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
        sx={{ border: 1, height: "80vh", padding: "20px", width: "50%" }}
      ></Box>
    );
  }

  return (
    <Box sx={{ border: 1, height: "80vh", padding: "20px", width: "50%", overflowY : "scroll" }}>
      <div className={styles.topBar}>
        <div>
          הספרים שקרא <b>{user.name}</b> :
        </div>
        <div>
          <button className={styles.addButton} onClick={handleAddBookButton}>
            הוסף ספר
          </button>
          <Popper id={id} open={open} anchorEl={anchorEl} >
            <Box
              sx={{
                border: 1,
                p: 1,
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {books
                ?.filter((book) => !listOfBookIds?.includes(book._id))
                .map((book) => (
                  <div
                    className={styles.addBookComponent}
                    onClick={() => handleAddBook(book._id)}
                  >
                    {book.name}
                  </div>
                ))}
            </Box>
          </Popper>
        </div>
      </div>
      <div className={styles.booksArea}>
        {user.books.map((book) => (
          <Book
            key={book._id}
            id={book._id}
            name={book.name}
            author={book.author.name}
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
