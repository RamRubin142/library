import { Box } from "@mui/material";
import { User } from "./User";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { selectUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { UserInterface } from "../models/users/UserInterface";
import { useNavigate } from "react-router-dom";
import {getUsers, deleteUserById, updateUserNameById} from "../api/users.api"
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
      getUsers(),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (variables: { userId: string }) => {
      return deleteUserById(variables.userId);
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
      return updateUserNameById(variables.userId, variables.newName);
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
