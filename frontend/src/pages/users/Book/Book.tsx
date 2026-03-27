import { Box, Typography } from "@mui/material";
import styles from "./Book.module.css";
type bookProps = {
  name: string;
  id: string;
  author: string;
  serialId: string;
  onDelete: (id: string) => void;
  onFavoriteChange: (id: string) => void;
  userId: string;
  isFavorite: boolean;
};

export const Book = (props: bookProps) => {
  const loggedUser = localStorage.getItem("loggedUser");
  const userIsLogged = (loggedUser == props.userId);
  const isFavorite = props.isFavorite;

  const handleDelete = async () => {
    props.onDelete(props.id);
  };

  return (
    <Box className={styles.bookContainer}>
      <Box className={styles.name}>
        <Typography className={styles.topText}>
          {`מזהה : ${props.serialId}    שם : ${props.name}`}
        </Typography>
        <Typography className={styles.bottomText}>
          סופר : {props.author}
        </Typography>
      </Box>
      {userIsLogged ? (
        <Box className={styles.buttons}>
          <Box>
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
          </Box>
          <button className={styles.deleteButton} onClick={handleDelete}>
            מחק
          </button>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};
