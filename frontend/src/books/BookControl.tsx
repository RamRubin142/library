import { Box } from "@mui/material";
import { ManyBooksControl } from "./ManyBooksControl";
import { OneBookControl } from "./OneBookControl";
import styles from "./style/BookControl.module.css";
export const BookControl = () => {
  return (
    <Box className={styles.book} sx={{ height: "100vh", flexGrow: 2 }}>
      <ManyBooksControl />
      <OneBookControl id="00"/>
    </Box>
  );
};
