import { Box } from "@mui/material";
import { Book } from "./Book";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import styles from "./style/OneAuthorControl.module.css";
import type { AuthorInterface } from "../models/authors/AuthorInterface";
export const OneAuthorControl = () => {
  const selectedAuthorId = useSelector(
    (state: RootState) => state.author.selectedAuthorId
  );

  const { data: author } = useQuery<AuthorInterface>({
    queryKey: ["author", selectedAuthorId],
    queryFn: () =>
      fetch("http://localhost:4000/authors/" + selectedAuthorId).then((res) => res.json()),
  });

  if (!author || !selectedAuthorId || Array.isArray(author)) {
    return (
      <Box
        sx={{ border: 1, height: "80vh", padding: "20px", width:"50%" }}
      ></Box>
    );
  } else {
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
          <div>
            {author.books.length > 0 ? (
              <div>
                הספרים של <b>{author.name}</b> :
              </div>
            ) : (
              <div>
                ל <b>{author.name}</b> אין ספרים
              </div>
            )}
          </div>
        </div>
        <div className={styles.booksArea}>
          {author.books.map((book) => (
            <Book
              key={book._id}
              id={book.serialId}
              name={book.name}
              serialId={book.serialId}
            />
          ))}
        </div>
      </Box>
    );
  }

  
};
