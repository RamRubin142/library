import { Box } from "@mui/material";
import { ManyAuthorsControl } from "../AuthorSelectionSection/AuthorSelectionSection";
import { OneAuthorControl } from "../AuthorDataSection/AuthorDataSection";
import styles from "./AuthorSection.module.css";
export const AuthorControl = () => {
  return (
    <Box className={styles.author} sx={{ height: "87vmin", flexGrow: 2, width : "50vmin" }}>
      <ManyAuthorsControl />
      <OneAuthorControl />
    </Box>
  );
};
