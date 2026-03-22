import { Box } from "@mui/material";
import { Book } from "./Book";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { selectBook } from "../redux/bookSlice";
import { useDispatch } from "react-redux";
export const ManyBooksControl = () => {
  const dispatch = useDispatch();
  interface BookInterface {
    _id: string;
    name: string;
    author : {_id : string, name : string};
  }

  const { data: books = [] } = useQuery<BookInterface[]>({
    queryKey: ["books"],
    queryFn: () =>
      fetch("http://localhost:4000/books").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (variables: { bookId: string }) => {
      return fetch("http://localhost:4000/books/" + variables.bookId, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: (variables: { bookId: string; newName: string }) => {
      return fetch("http://localhost:4000/books/" + variables.bookId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: variables.newName }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  return (
    <Box sx={{ border: 1, height: "100vh", padding: "20px", width : "50%" }}>
      {books.map((book) => (
        <Book
          key={book._id}
          id={book._id}
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
