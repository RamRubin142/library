import { Box, Button, Dialog, DialogTitle } from "@mui/material";
import styles from "./UserDataSection.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { UserInterface } from "@models/users/UserInterface";
import type { BookInterface } from "@models/books/BookInterface";
import PsychologyIcon from "@mui/icons-material/Psychology";
import {
  getUserById,
  favoriteBooksOfUser,
  deleteBooksFromUser,
  addBooksToUser,
} from "@api/users.api";
import { getBooks } from "@api/books.api";
import { DataSectionCard } from "@components/DataSectionCard/DataSectionCard";
export const OneUserControl = () => {
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
    return (
      <Box
        sx={{ border: 1, height: "80vh", padding: "20px", width: "50%" }}
      ></Box>
    );
  }

  return (
    <Box className={styles.dataSection}>
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
          <Box>
            <button className={styles.addButton} onClick={handleAddBookButton}>
              הוסף ספר
            </button>
            <Dialog open={addBookPopupIsOpen}>
              <Box className={styles.dialog}>
                {books &&
                books.filter((book) => !listOfBookIds?.includes(book?._id))
                  ?.length > 0 ? (
                  <Box
                    sx={{
                      p: 1,
                      bgcolor: "background.paper",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <DialogTitle>בחר ספר</DialogTitle>
                    {books
                      ?.filter((book) => !listOfBookIds?.includes(book._id))
                      .map((book) => (
                        <Box
                          className={styles.addBookComponent}
                          onClick={() => handleAddBook(book._id)}
                        >
                          {book.name}
                        </Box>
                      ))}
                  </Box>
                ) : (
                  <>
                    <DialogTitle>אין בספריה ספרים שעוד לא קראת</DialogTitle>
                    <PsychologyIcon className={styles.icon}/>
                  </>
                )}

                <Button
                  className={styles.closeButton}
                  onClick={() => setAddBookPopupIsOpen(false)}
                >
                  סגור
                </Button>
              </Box>
            </Dialog>
          </Box>
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
  );
};
