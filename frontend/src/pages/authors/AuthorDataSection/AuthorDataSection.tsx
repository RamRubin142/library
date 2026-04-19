import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import styles from "./AuthorDataSection.module.css";
import type { AuthorInterface } from "@models/authors/AuthorInterface";
import { getAuthorById } from "@api/authors.api";
import { DataSectionCard } from "@components/DataSectionCard/DataSectionCard";
export const OneAuthorControl = () => {
  const selectedAuthorId = useSelector(
    (state: RootState) => state.author.selectedAuthorId,
  );

  const { data: author } = useQuery<AuthorInterface>({
    queryKey: ["author", selectedAuthorId],
    queryFn: () => getAuthorById(selectedAuthorId),
  });

  if (!author || !selectedAuthorId || Array.isArray(author)) {
    return (
      <Box
        sx={{  height: "80vh", padding: "2vmin", width: "40%", backgroundColor : "background.default" }}
      ></Box>
    );
  } else {
    return (
      <Box
        className={styles.dataSection}
      >
        <Box className={styles.topBar}>
          <Box>
            {author.books.length > 0 ? (
              <Box className={styles.topBarText}>
                הספרים של
                <Box className={styles.title}>
                  <b>{author.name}</b>
                </Box>
              </Box>
            ) : (
              <Box className={styles.topBarText}>
                ל
                <Box className={styles.title}>
                  <b>{author.name}</b>
                </Box>
                אין ספרים
              </Box>
            )}
          </Box>
        </Box>
        <Box className={styles.booksArea}>
          {author.books.map((book) => (
            <DataSectionCard
              key={book._id}
              id={book.serialId}
              name={book.name}
              serialId={book.serialId}
            />
          ))}
        </Box>
      </Box>
    );
  }
};
