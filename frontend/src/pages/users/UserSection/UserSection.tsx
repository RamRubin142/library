import { Box } from "@mui/material";
import { ManyUsersControl } from "../UserSelectionSection/UserSelectionSection";
import { OneUserControl } from "../UserDataSection/UserDataSection";
import styles from "./UserSection.module.css";
export const UserControl = () => {
  return (
    <Box className={styles.user} sx={{ height: "100vh", flexGrow: 2 }}>
      <ManyUsersControl />
      <OneUserControl />
    </Box>
  );
};
