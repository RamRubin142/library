import { Box, Typography } from "@mui/material";
import styles from "./DataSectionCard.module.css";
type DataSectionCardProps = {
  name: string;
  id: string;
  author?: string;
  serialId: string;
  onDelete?: (id: string) => void;
  onFavoriteChange?: (id: string) => void;
  userId?: string;
  isFavorite?: boolean;
  userIsLogged?: boolean;
};

export const DataSectionCard = (props: DataSectionCardProps) => {
  const handleDelete = async () => {
    props.onDelete?.(props.id);
  };
  const setBookAsFavorite = async () => {
    props.onFavoriteChange?.(props.id);
  };
  const unFavoriteBook = async () => {
    props.onFavoriteChange?.("");
  }

  return (
    <Box className={styles.bookContainer}>
      <Box className={styles.name}>
        <Typography className={styles.topText}>
          {`מזהה : ${props.serialId}    שם : ${props.name}`}
        </Typography>
        {props.author ? (
          <Typography className={styles.bottomText}>
            סופר : {props.author}
          </Typography>
        ) : (
          <></>
        )}
      </Box>
      {props.userIsLogged ? (
        <Box className={styles.buttons}>
          <Box>
            {props.isFavorite ? (
              <button
                className={styles.favoriteButton}
                onClick={() => {
                  unFavoriteBook();
                }}
              ></button>
            ) : (
              <button
                className={styles.notFavoriteButton}
                onClick={() => {
                  setBookAsFavorite();
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
