import { Box } from "@mui/material";
import { ManyBooksControl } from "../BookSelectionSection/BookSelectionSection";
import { OneBookControl } from "../BookDataSection/BookDataSection";
import styles from "./BookSection.module.css";
export const BookControl = () => {
  return (
    <Box className={styles.book} sx={{ height: "100vh", flexGrow: 2 }}>
      <ManyBooksControl />
      <OneBookControl />
    </Box>
  );
};
