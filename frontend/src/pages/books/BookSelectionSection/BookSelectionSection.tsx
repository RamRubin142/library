import { Box } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { selectBook, setBookIsEdited } from "@redux/bookSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import type { BookInterface } from "@models/books/BookInterface";
import { getBooks, deleteBookById, updateBookNameById } from "@api/books.api";
import { SelectionSectionCard } from "@components/SelectionSectionCard/SelectionSectionCard";
import styles from "./BookSelectionSection.module.css";
export const ManyBooksControl = () => {
  const dispatch = useDispatch();

  const selectedBookId = useSelector(
    (state: RootState) => state.book.selectedBookId,
  );
  const editedBookId = useSelector(
    (state: RootState) => state.book.editedBookId,
  );
  const editedBookText = useSelector(
    (state: RootState) => state.book.editedBookText,
  );

  const { data: books = [] } = useQuery<BookInterface[]>({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (variables: { bookId: string }) => {
      return deleteBookById(variables.bookId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["favBook"] });
      queryClient.invalidateQueries({
        queryKey: ["book", variables.bookId],
      });
      if (selectedBookId === variables.bookId) {
        dispatch(selectBook(null));
      }
    },
  });

  const editMutation = useMutation({
    mutationFn: (variables: { bookId: string; newName: string }) => {
      return updateBookNameById(variables.bookId, variables.newName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["favBook"] });
      queryClient.invalidateQueries({ queryKey: ["book"] });
    },
  });

  const editButtonClicked = (
    bookId: string | null,
    bookText: string | null,
  ) => {
    dispatch(setBookIsEdited({ bookId, bookText }));
  };

  const editTextChanged = (bookId: string | null, bookText: string | null) => {
    dispatch(setBookIsEdited({ bookId, bookText }));
  };

  return (
    <Box className={styles.selectionSection}>
      <Box className={styles.content}>
        {books.map((book) => (
          <SelectionSectionCard
            isSelected={selectedBookId == book._id}
            isCurrentlyEdited={editedBookId == book._id}
            currentlyEditedText={editedBookText}
            onEditButtonChange={editButtonClicked}
            onEditTextChange={editTextChanged}
            key={book._id}
            id={book._id}
            serialId={book.serialId}
            name={book.name}
            author={book.author.name}
            onDelete={(id: string) => {
              deleteMutation.mutate({ bookId: id });
            }}
            onUpdate={(bookId: string, newName: string) => {
              editMutation.mutate({ bookId, newName });
            }}
            onSelect={(id: string) => dispatch(selectBook(id))}
          />
        ))}
      </Box>
    </Box>
  );
};
