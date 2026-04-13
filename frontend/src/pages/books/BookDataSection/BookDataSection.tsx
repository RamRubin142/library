import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookById } from "@api/books.api";
import { deleteBooksFromUser } from "@api/users.api";
import styles from "./BookDataSection.module.css";
import type { BookInterface } from "@models/books/BookInterface";
import { DataSectionCard } from "@components/DataSectionCard/DataSectionCard";
export const OneBookControl = () => {
  const selectedBookId = useSelector(
    (state: RootState) => state.book.selectedBookId,
  );

  const queryClient = useQueryClient();

  const { data: book } = useQuery<BookInterface>({
    queryKey: ["book", selectedBookId],
    queryFn: () => getBookById(selectedBookId),
  });

  const deleteMutation = useMutation({
    mutationFn: (variables: { bookId: string; userId: string }) => {
      return deleteBooksFromUser(variables.userId, variables.bookId);
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
      <Box className={styles.topBar}>
        {book.readers.length > 0 ? (
          <Box className={styles.topBarText}>
            הקוראים של
            <Box className={styles.title}>
              <b>{book.name}</b>
            </Box>
          </Box>
        ) : (
          <Box className={styles.topBarText}>
            ל
            <Box className={styles.title}>
              <b>{book.name}</b>
            </Box>
            אין קוראים
          </Box>
        )}
      </Box>
      <Box className={styles.booksArea}>
        {book.readers.map((reader) => (
          <DataSectionCard
            key={reader._id}
            id={reader._id}
            name={reader.name}
            serialId={reader.serialId}
            onDelete={(userId: string) => {
              deleteMutation.mutate({ bookId: selectedBookId, userId });
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
