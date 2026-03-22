import { Box } from "@mui/material";
import { ManyUsersControl } from "./ManyUsersControl";
import { OneUserControl } from "./OneUserControl";
import styles from "./style/UserControl.module.css";
export const UserControl = () => {
  return (
    <Box className={styles.user} sx={{ height: "100vh", flexGrow: 2 }}>
      <ManyUsersControl />
      <OneUserControl id="00" />
    </Box>
  );
};
