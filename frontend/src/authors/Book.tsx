import { Box } from "@mui/material";
import styles from "./style/Book.module.css";

type bookProps = {
  name: string;
  id: string;
};

export const Book = (props: bookProps) => {


  return (
    <Box className={styles.bookContainer}>
      <div className={styles.name}>
        <div className={styles.text}>{` מזהה : ${props.id}  שם : ${props.name} `}</div>
      </div>
    </Box>
  );
};
