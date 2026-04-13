import { Box } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { selectUser, setUserIsEdited } from "@redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import type { UserInterface } from "@models/users/UserInterface";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUserById, updateUserNameById } from "@api/users.api";
import { SelectionSectionCard } from "@components/SelectionSectionCard/SelectionSectionCard";
import { logUserOut } from "@redux/loggedUserSlice";
export const ManyUsersControl = () => {
  const editedUserId = useSelector(
    (state: RootState) => state.user.editedUserId,
  );
  const editedUserText = useSelector(
    (state: RootState) => state.user.editedUserText,
  );

  const selectedUserId = useSelector(
    (state: RootState) => state.user.selectedUserId,
  );
  const loggedUserId = useSelector(
    (state: RootState) => state.loggedUser.loggedUserId,
  );

  const { data: users = [] } = useQuery<UserInterface[]>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (variables: { userId: string }) => {
      return deleteUserById(variables.userId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (selectedUserId === variables.userId) {
        dispatch(selectUser(null));
      }
      if (variables.userId == loggedUserId) {
        dispatch(logUserOut());
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

  const editButtonClicked = (
    userId: string | null,
    userText: string | null,
  ) => {
    dispatch(setUserIsEdited({ userId, userText }));
  };

  const editTextChanged = (userId: string | null, userText: string | null) => {
    dispatch(setUserIsEdited({ userId, userText }));
  };

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
        <SelectionSectionCard
          isSelected={selectedUserId == user._id}
          isCurrentlyEdited={editedUserId == user._id}
          currentlyEditedText={editedUserText}
          onEditButtonChange={editButtonClicked}
          onEditTextChange={editTextChanged}
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
