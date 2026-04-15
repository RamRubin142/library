import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { UserInterface } from "@models/users/UserInterface";
import { getUsers } from "@api/users.api";
import styles from "./LoginPage.module.css";
import { useDispatch } from "react-redux";
import { logUserIn } from "@redux/loggedUserSlice";
import { TitleComponent } from "@components/TitleComponent/TitleComponent";
export const LoginPage = () => {
  const { data: users = [] } = useQuery<UserInterface[]>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const [selectedUser, selectUser] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(logUserIn(selectedUser));
    navigate("/home");
  };

  return (
    <Box className={styles.container}>
      <TitleComponent size={"30vmin"} color={"black"} />

      <FormControl className={styles.formControl} >
        <InputLabel id="demo-select-small-label">
          בחר משתמש להתחברות ...
        </InputLabel>

        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedUser}
          label="בחר משתמש להתחברות ..."
          onChange={(event) => {
            selectUser(event.target.value);
          }}
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id} className={styles.text}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <button className={styles.loginButton} onClick={handleLogin}>
        התחבר
      </button>
    </Box>
  );
};


