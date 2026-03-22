import { Box } from "@mui/material";
import { ManyAuthorsControl } from "./ManyAuthorsControl";
import { OneAuthorControl } from "./OneAuthorControl";
import styles from "./style/AuthorControl.module.css"
export const AuthorControl = () => {

  return (
    <Box className={styles.author} sx={{ height: "100vh", flexGrow: 2 }}>
      <ManyAuthorsControl />
      <OneAuthorControl />
    </Box>
  );
};
