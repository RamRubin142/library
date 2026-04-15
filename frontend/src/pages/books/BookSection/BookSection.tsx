import { Box } from "@mui/material";
import { ManyBooksControl } from "../BookSelectionSection/BookSelectionSection";
import { OneBookControl } from "../BookDataSection/BookDataSection";
import styles from "./BookSection.module.css";
export const BookControl = () => {
  return (
    <Box className={styles.book} sx={{ height: "87vmin", flexGrow: 2, width:"50vmin" }}>
      <ManyBooksControl />
      <OneBookControl />
    </Box>
  );
};
