import { Box } from "@mui/material";
import { Author } from "../Author/Author";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { selectAuthor } from "../../../redux/authorSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { selectBook } from "../../../redux/bookSlice";
import { type AuthorInterface } from "../../../models/authors/AuthorInterface";
import {
  getAuthors, 
  deleteAuthorById,
  updateAuthorNameById,
} from "../../../api/authors.api";
export const ManyAuthorsControl = () => {
  const dispatch = useDispatch();

  const selectedAuthorId = useSelector(
    (state: RootState) => state.author.selectedAuthorId
  );

  const { data: authors = [] } = useQuery<AuthorInterface[]>({
    queryKey: ["authors"],
    queryFn: () => getAuthors(),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (variables: { authorId: string }) => {
      return deleteAuthorById(variables.authorId);
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
      return updateAuthorNameById(variables.authorId, variables.newName);
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
          serialId={author.serialId}
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
