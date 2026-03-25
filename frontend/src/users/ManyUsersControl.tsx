import { Box } from "@mui/material";
import { User } from "./User";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { selectUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { UserInterface } from "../models/users/UserInterface";
import { useNavigate } from "react-router-dom";
export const ManyUsersControl = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedUserId = useSelector(
    (state: RootState) => state.user.selectedUserId
  );
  const loggedUserId = localStorage.getItem("loggedUser");

  const { data: users = [] } = useQuery<UserInterface[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:4000/users").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (variables: { userId: string }) => {
      return fetch("http://localhost:4000/users/" + variables.userId, {
        method: "DELETE",
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (selectedUserId === variables.userId) {
        dispatch(selectUser(""));
      }
      if(variables.userId == loggedUserId) {
        localStorage.setItem("loggedUser", "");
        navigate("/login");

      }
    },
  });

  const editMutation = useMutation({
    mutationFn: (variables: { userId: string; newName: string }) => {
      return fetch("http://localhost:4000/users/" + variables.userId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: variables.newName }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <Box
      sx={{
        border: 1,
        height: "80vh",
        padding: "20px",
        width: "50%",
        overflowY: "scroll",
      }}
    >
      {users.map((user) => (
        <User
          key={user._id}
          id={user._id}
          name={user.name}
          serialId={user.serialId}
          onDelete={(id: string) => {
            deleteMutation.mutate({ userId: id });
          }}
          onUpdate={(userId: string, newName: string) => {
            editMutation.mutate({ userId, newName });
          }}
          onSelect={(id: string) => dispatch(selectUser(id))}
        />
      ))}
    </Box>
  );
};
