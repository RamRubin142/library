import { Box } from "@mui/material";
import styles from "./DataSectionCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
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
  };

  return (
    <Box className={styles.bookContainer}>
      <Box className={styles.dataSection}>
        <Box className={styles.text}>
          {`מזהה : ${props.serialId}    שם : ${props.name}`}
        </Box>
        {props.author ? (
          <Box className={styles.text}>
            סופר : {props.author}
          </Box>
        ) : (
          <></>
        )}
      </Box>
      {props.userIsLogged ? (
        <Box className={styles.buttons}>
          <Box className={styles.buttonContainer}>
            {props.isFavorite ? (
              <StarIcon
                className={styles.favoriteButton}
                onClick={() => {
                  unFavoriteBook();
                }}
              />
            ) : (
              <StarBorderIcon
                className={styles.favoriteButton}
                onClick={() => {
                  setBookAsFavorite();
                }}
              />
            )}
          </Box>
          <Box className={styles.buttonContainer}>
            <DeleteIcon
              className={styles.deleteButton}
              onClick={handleDelete}
            />
          </Box>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};
