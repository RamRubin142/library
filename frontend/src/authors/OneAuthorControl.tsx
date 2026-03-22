import { Box } from "@mui/material";
import { Book } from "./Book";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import styles from "./style/OneAuthorControl.module.css";
export const OneAuthorControl = () => {
  const selectedAuthorId = useSelector(
    (state: RootState) => state.author.selectedAuthorId
  );
  interface BookInterface {
    _id: string;
    name: string;
  }
  interface AuthorInterface {
    _id: string;
    name: string;
    books: BookInterface[];
  }

  const { data: author } = useQuery<AuthorInterface>({
    queryKey: ["author", selectedAuthorId],
    queryFn: () =>
      fetch("http://localhost:4000/authors/" + selectedAuthorId).then((res) => res.json()),
  });

  if (!author || !selectedAuthorId || Array.isArray(author)) {
    return (
      <Box
        sx={{ border: 1, height: "100vh", padding: "20px", width:"50%" }}
      ></Box>
    );
  } else {
    return (
      <Box sx={{ border: 1, height: "100vh", padding: "20px", width:"50%" }}>
        <div className={styles.topBar}>
          <div>
            הספרים של <b>{author.name}</b> :
          </div>
        </div>
        <div className={styles.booksArea}>
          {author.books.map((book) => (
            <Book key={book._id} id={book._id} name={book.name} />
          ))}
        </div>
      </Box>
    );
  }

  
};
