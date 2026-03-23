import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, Typography, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {Select} from "@mui/material"
import { logUserIn } from "./redux/loggedSlice";
import { useDispatch } from "react-redux";

export const LoginPage = () => {
  interface UserInterface {
    _id: string;
    name: string;
  }
  const dispatch = useDispatch();

  const { data: users = [] } = useQuery<UserInterface[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:4000/users").then((res) => res.json()),
  });

  const [selectedUser, selectUser] = React.useState("");


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
            <MenuItem value={user._id}>{user.name}</MenuItem>
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
        onClick={() => dispatch(logUserIn(selectedUser))}
      >
        התחבר
      </Button>
    </Box>
  );
};
