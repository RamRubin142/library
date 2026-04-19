import {
  Box,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import styles from "./UserDataSection.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { UserInterface } from "@models/users/UserInterface";
import type { BookInterface } from "@models/books/BookInterface";
import {
  getUserById,
  favoriteBooksOfUser,
  deleteBooksFromUser,
  addBooksToUser,
} from "@api/users.api";
import { getBooks } from "@api/books.api";
import { DataSectionCard } from "@components/DataSectionCard/DataSectionCard";
export const OneUserControl = () => {
  const [selectedBook, selectBook] = useState("");
  const loggedUser = useSelector(
    (state: RootState) => state.loggedUser.loggedUserId,
  );

  const selectedUserId = useSelector(
    (state: RootState) => state.user.selectedUserId,
  );
  const selectedUserIsLogged = loggedUser == selectedUserId;

  const [addBookPopupIsOpen, setAddBookPopupIsOpen] = useState(false);

  const handleAddBookButton = () => {
    setAddBookPopupIsOpen(true);
  };

  const handleAddBook = (bookId: string) => {
    if (selectedUserId) {
      addBookMutation.mutate({ bookId, userId: selectedUserId });
      setAddBookPopupIsOpen(false);
    }
  };

  const { data: user } = useQuery<UserInterface>({
    queryKey: ["user", selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });

  const { data: books } = useQuery<BookInterface[]>({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  const listOfBookIds = user?.books?.map((book) => book._id);

  const deleteMutation = useMutation({
    mutationFn: (variables: { bookId: string; userId: string }) => {
      return deleteBooksFromUser(variables.userId, variables.bookId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["favBook"] });
    },
  });

  const addBookMutation = useMutation({
    mutationFn: (variables: { bookId: string; userId: string }) => {
      return addBooksToUser(variables.userId, variables.bookId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: (variables: { bookId: string; userId: string }) => {
      return favoriteBooksOfUser(variables.userId, variables.bookId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const queryClient = useQueryClient();

  if (!user || !selectedUserId || Array.isArray(user)) {
    return <Box sx={{ height: "80vh", padding: "20px", width: "50%" }}></Box>;
  }

  return (
    <Box className={styles.dataSection}>
      <Box className={styles.content}>
        <Box className={styles.topBar}>
          <Box>
            {user.books.length > 0 ? (
              <Box className={styles.topBarText}>
                הספרים ש
                <Box className={styles.title}>
                  <b>{user.name}</b>
                </Box>
                קרא:
              </Box>
            ) : (
              <Box className={styles.topBarText}>
                ל
                <Box className={styles.title}>
                  <b>{user.name}</b>
                </Box>
                אין ספרים שהוא קרא
              </Box>
            )}
          </Box>
          {selectedUserIsLogged ? (
            <>
              <button
                className={styles.addButton}
                onClick={handleAddBookButton}
              >
                הוסף ספר
              </button>
              <Dialog
                open={addBookPopupIsOpen}
                sx={{
                  "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                      width: "100%",
                      height: "100%",
                      maxWidth: "75vmin",
                      maxHeight: "45vmin",
                      backgroundColor: "background.paper",
                      border: "0.5vmin dashed brown",
                      borderRadius: "0",
                    },
                  },
                }}
              >
                <Box className={styles.dialog}>
                  {books &&
                  books.filter((book) => !listOfBookIds?.includes(book?._id))
                    ?.length > 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box className={styles.dialogTitle}>בחר ספר</Box>
                      <FormControl
                        sx={{
                          "& .MuiInputBase-root": {
                            fontSize: "3vmin",
                            height: "10vmin",
                            marginTop: "2vmin",
                          },

                          "& .MuiSelect-select": {
                            padding: "1vmin",
                            display: "flex",
                            alignItems: "center",
                          },

                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "0.3vmin solid brown",
                          },

                          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "black",
                            },

                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "blue",
                            },

                          "& .MuiSelect-icon": {
                            fontSize: "5vmin",
                            right: "3vmin",
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "3vmin",
                            transform: "translate(1.5vmin, 1.5vmin) scale(1)",
                          },

                          "& .MuiInputLabel-shrink": {
                            transform: "translate(1.5vmin, -1vmin) scale(0.8)",
                          },
                        }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          ספר
                        </InputLabel>
                        <Select
                          value={selectedBook}
                          label="ספר"
                          onChange={(event) => {
                            selectBook(event.target.value);
                          }}
                        >
                          {books
                            ?.filter(
                              (book) => !listOfBookIds?.includes(book._id),
                            )
                            .map((book) => (
                              <MenuItem
                                className={styles.addBookComponent}
                                onClick={() => handleAddBook(book._id)}
                              >
                                {book.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  ) : (
                    <>
                      <DialogTitle className={styles.dialogTitle}>
                        אין בספריה ספרים שעוד לא קראת
                      </DialogTitle>
                      <img
                        className={styles.patrick}
                        src="https://pbs.twimg.com/media/E-DYbZwX0AEXLhU.jpg"
                      />
                    </>
                  )}

                  <button
                    className={styles.closeButton}
                    onClick={() => setAddBookPopupIsOpen(false)}
                  >
                    סגור
                  </button>
                </Box>
              </Dialog>
            </>
          ) : (
            <Box></Box>
          )}
        </Box>
        <Box className={styles.booksArea}>
          {user.books.map((book) => (
            <DataSectionCard
              userIsLogged={loggedUser == user._id}
              key={book._id}
              id={book._id}
              serialId={book.serialId}
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
        </Box>
      </Box>
    </Box>
  );
};
