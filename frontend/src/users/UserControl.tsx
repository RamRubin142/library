import { Box } from "@mui/material";
import { ManyUsersControl } from "./ManyUsersControl";
import { OneUserControl } from "./OneUserControl";
import { UnloggedOneUserControl } from "./UnloggedOneUserControl";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import styles from "./style/UserControl.module.css";
export const UserControl = () => {
  const loggedUser = useSelector(
    (state: RootState) => state.currentUser.loggedInUserId
  );
  const selectedUser = useSelector(
    (state: RootState) => state.user.selectedUserId
  );

  return (
    <Box className={styles.user} sx={{ height: "100vh", flexGrow: 2 }}>
      <ManyUsersControl />
      {loggedUser == selectedUser ? (
        <OneUserControl />
      ) : (
        <UnloggedOneUserControl />
      )}
    </Box>
  );
};
