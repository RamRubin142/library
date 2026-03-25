import { Box } from "@mui/material";
import { User } from "./User";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./style/OneBookControl.module.css";
import type { BookInterface } from "../models/books/BookInterface";
export const OneBookControl = () => {
  const selectedBookId = useSelector(
    (state: RootState) => state.book.selectedBookId
  );

  const queryClient = useQueryClient();

  const { data: book } = useQuery<BookInterface>({
    queryKey: ["book", selectedBookId],
    queryFn: () =>
      fetch("http://localhost:4000/books/" + selectedBookId).then((res) =>
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
      queryClient.invalidateQueries({ queryKey: ["book"] });
      queryClient.invalidateQueries({ queryKey: ["favBook"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  if (!book || !selectedBookId || Array.isArray(book)) {
    return (
      <Box
        sx={{ border: 1, height: "80vh", padding: "20px", width: "50%" }}
      ></Box>
    );
  }

  return (
    <Box
      sx={{
        border: 1,
        height: "80vh",
        padding: "20px",
        width: "50%",
        overflowY: "scroll",
      }}
    >
      <div className={styles.topBar}>
        {book.readers.length > 0 ? (
          <div>
            הקוראים של <b>{book.name}</b> :
          </div>
        ) : (
          <div>
            ל <b>{book.name}</b> אין קוראים
          </div>
        )}
      </div>
      <div className={styles.booksArea}>
        {book.readers.map((reader) => (
          <User
            key={reader._id}
            id={reader._id}
            name={reader.name}
            serialId={reader.serialId}
            onDelete={(userId: string) => {
              deleteMutation.mutate({ bookId: selectedBookId, userId });
            }}
          />
        ))}
      </div>
    </Box>
  );
};
