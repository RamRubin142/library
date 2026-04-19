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
    if (selectedUser) {
      dispatch(logUserIn(selectedUser));
      navigate("/home");
    }
  };

  return (
    <Box className={styles.container}>
      <TitleComponent size={"30vmin"} color={"black"} />

      <FormControl
        className={styles.formControl}
        sx={{
          "& .MuiInputBase-root": {
            fontSize: "3vmin",
            height: "10vmin",
            marginTop: "2vmin",
          },

          "& .MuiSelect-select": {
            padding: "1vmin",
            display: "flex",
            alignItems: "center",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            border: "0.3vmin solid brown",
          },

          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },

          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "blue",
            },

          "& .MuiSelect-icon": {
            fontSize: "5vmin",
            right: "3vmin",
          },
          "& .MuiInputLabel-root": {
            fontSize: "3vmin",
            transform: "translate(1.5vmin, 1.5vmin) scale(1)",
          },

          "& .MuiInputLabel-shrink": {
            transform: "translate(1.5vmin, -1vmin) scale(0.8)",
          },
        }}
      >
        <InputLabel
          shrink
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "3vmin",
              marginTop: "1vmin",
            },
          }}
        >
          בחר משתמש להתחברות ...
        </InputLabel>

        <Select
          notched={false}
          displayEmpty
          value={selectedUser}
          label="משתמש"
          onChange={(event) => {
            selectUser(event.target.value);
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: "30vmin", // 👈 fixed height
                overflowY: "auto", // 👈 enable scroll
              },
            },
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
