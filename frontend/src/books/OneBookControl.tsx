import { Box } from "@mui/material";
import { User } from "./User";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./style/OneBookControl.module.css";
export const OneBookControl = () => {
  const selectedBookId = useSelector(
    (state: RootState) => state.book.selectedBookId
  );
  interface UserInterface {
    _id: string;
    name: string;
  }
  interface BookInterface {
    _id: string;
    name: string;
    readers: UserInterface[];
  }
    const queryClient = useQueryClient();

  const { data: book } = useQuery<BookInterface>({
    queryKey: ["book", selectedBookId],
    queryFn: () =>
      fetch("http://localhost:4000/books/" + selectedBookId).then((res) =>
        res.json()
      ),
  });

  const deleteMutation = useMutation({
    mutationFn: (variables: { bookId: string , userId :string}) => {
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
    },
  });

  if (!book || !selectedBookId || Array.isArray(book)) {
    return (
      <Box
        sx={{ border: 1, height: "100vh", padding: "20px", width: "50%" }}
      ></Box>
    );
  }

  return (
    <Box sx={{ border: 1, height: "100vh", padding: "20px", width: "50%" }}>
      <div className={styles.topBar}>
        <div>
          הקוראים של <b>{book.name}</b> :
        </div>
      </div>
      <div className={styles.booksArea}>
        {book.readers.map((reader) => (
          <User
            key={reader._id}
            id={reader._id}
            name={reader.name}
            onDelete={(userId: string) => {
              deleteMutation.mutate({ bookId: selectedBookId, userId });
            }}
          />
        ))}
      </div>
    </Box>
  );
};
