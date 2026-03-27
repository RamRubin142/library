import { Box } from "@mui/material";
import styles from "./Book.module.css";

type bookProps = {
  name: string;
  id: string;
  serialId :string;
};

export const Book = (props: bookProps) => {


  return (
    <Box className={styles.bookContainer}>
      <Box className={styles.name}>
        <Box className={styles.text}>{` מזהה : ${props.serialId}  שם : ${props.name} `}</Box>
      </Box>
    </Box>
  );
};
