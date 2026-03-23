import { Box } from "@mui/material";
import { Author } from "./Author";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { selectAuthor } from "../redux/authorSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { selectBook } from "../redux/bookSlice";
export const ManyAuthorsControl = () => {
  const dispatch = useDispatch();
  interface AuthorInterface {
    _id: string;
    name: string;

  }

  const selectedAuthorId = useSelector(
    (state: RootState) => state.author.selectedAuthorId
  );


  const { data: authors = [] } = useQuery<AuthorInterface[]>({
    queryKey: ["authors"],
    queryFn: () =>
      fetch("http://localhost:4000/authors").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (variables: { authorId: string }) => {
      return fetch("http://localhost:4000/authors/" + variables.authorId, {
        method: "DELETE",
      });
    },
    onSuccess: (_data, variables) => {
      dispatch(selectBook(""));
      queryClient.invalidateQueries({ queryKey: ["favBook"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["book"] });
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.invalidateQueries({
        queryKey: ["author", variables.authorId],
      });
      if (selectedAuthorId === variables.authorId) {
        dispatch(selectAuthor(""));
      }
    },
  });

  const editMutation = useMutation({
    mutationFn: (variables: { authorId: string; newName: string }) => {
      return fetch("http://localhost:4000/authors/" + variables.authorId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: variables.newName }),
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.invalidateQueries({
        queryKey: ["author", variables.authorId],
      });
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
      {authors.map((author) => (
        <Author
          key={author._id}
          id={author._id}
          name={author.name}
          onDelete={(id: string) => {
            deleteMutation.mutate({ authorId: id });
          }}
          onUpdate={(authorId: string, newName: string) => {
            editMutation.mutate({ authorId, newName });
          }}
          onSelect={(id: string) => dispatch(selectAuthor(id))}
        />
      ))}
    </Box>
  );
};
