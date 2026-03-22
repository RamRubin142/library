import { Box } from "@mui/material";
import styles from "./style/Book.module.css";

type bookProps = {
  name: string;
  id: string;
  author: string;
  onDelete: (id: string) => void;
  onFavoriteChange: (id: string) => void;
  userId: string;
  isFavorite: boolean;
};

export const Book = (props: bookProps) => {
  const isFavorite = props.isFavorite;

  const handleDelete = async () => {
    props.onDelete(props.id);
  };

  return (
    <Box className={styles.bookContainer}>
      <div className={styles.name}>
        <p className={styles.topText}>
          {`מזהה : ${props.id}    שם : ${props.name}`}
        </p>
        <p className={styles.bottomText}>סופר : {props.author}</p>
      </div>
      <div className={styles.buttons}>
        <div>
          {isFavorite ? (
            <button
              className={styles.favoriteButton}
              onClick={() => {
                props.onFavoriteChange("");
              }}
            ></button>
          ) : (
            <button
              className={styles.notFavoriteButton}
              onClick={() => {
                props.onFavoriteChange(props.id);
              }}
            ></button>
          )}
        </div>
        <button className={styles.deleteButton} onClick={handleDelete}>
          מחק
        </button>
      </div>
    </Box>
  );
};
