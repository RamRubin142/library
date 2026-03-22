import { Box } from "@mui/material";
import styles from "./style/Book.module.css";

type unloggedBookProps = {
  name: string;
  id: string;
  author: string;
};

export const UnloggedBook = (props: unloggedBookProps) => {

  return (
    <Box className={styles.bookContainer}>
      <div className={styles.name}>
        <p className={styles.topText}>
          {`מזהה : ${props.id}    שם : ${props.name}`}
        </p>
        <p className={styles.bottomText}>סופר : {props.author}</p>
      </div>
    </Box>
  );
};
