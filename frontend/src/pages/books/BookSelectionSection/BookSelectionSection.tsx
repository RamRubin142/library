import { Box } from "@mui/material";
import { Book } from "../Book/Book";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { selectBook } from "../../../redux/bookSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import type { BookInterface } from "../../../models/books/BookInterface";
import {
  getBooks,
  deleteBookById,
  updateBookNameById,
} from "../../../api/books.api";
export const ManyBooksControl = () => {
  const dispatch = useDispatch();

  const selectedBookId = useSelector(
    (state: RootState) => state.book.selectedBookId
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
        dispatch(selectBook(""));
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
      {books.map((book) => (
        <Book
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
  );
};
