import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, Typography, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { UserInterface } from "./models/users/UserInterface";
import {getUsers} from "./api/users.api"
import styles from "./LoginPage.module.css";
export const LoginPage = () => {
  const navigate = useNavigate();

  const { data: users = [] } = useQuery<UserInterface[]>({
    queryKey: ["users"],
    queryFn: () =>
      getUsers(),
  });

  const [selectedUser, selectUser] = React.useState("");

  const handleLogin = async () => {
    localStorage.setItem("loggedUser", selectedUser);
    navigate("/home");
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography sx={{ fontSize: "100px", marginTop: "100px" }}>
        הספריה
      </Typography>
      <FormControl sx={{ width: "400px" }} size="medium">
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
            <MenuItem value={user._id} className={styles.text}>{user.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        sx={{
          backgroundColor: "green",
          color: "white",
          borderRadius: 0,
          width: "150px",
          marginTop: "50px",
        }}
        onClick={handleLogin}
      >
        התחבר
      </Button>
    </Box>
  );
};
