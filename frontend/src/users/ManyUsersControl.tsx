import { Box } from "@mui/material";
import { User } from "./User";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { selectUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
export const ManyUsersControl = () => {
  const dispatch = useDispatch();
  interface UserInterface {
    _id: string;
    name: string;
  }

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
    },
  });

  return (
    <Box sx={{ border: 1, height: "100vh", padding: "20px", width : "50%" }}>
      {users.map((user) => (
        <User
          key={user._id}
          id={user._id}
          name={user.name}
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
