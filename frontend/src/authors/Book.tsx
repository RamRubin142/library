import { Box } from "@mui/material";
import styles from "./style/Book.module.css";

type bookProps = {
  name: string;
  id: string;
  serialId :string;
};

export const Book = (props: bookProps) => {


  return (
    <Box className={styles.bookContainer}>
      <div className={styles.name}>
        <div className={styles.text}>{` מזהה : ${props.serialId}  שם : ${props.name} `}</div>
      </div>
    </Box>
  );
};
