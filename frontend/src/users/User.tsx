import { Box } from "@mui/material";
import styles from "./style/User.module.css";
import type { KeyboardEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { UserSlice } from "../redux/userSlice";

type userProps = {
  name: string;
  id: string;
  serialId :string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newName: string) => void;
  onSelect: (id: string) => void;
};

export const User = (props: userProps) => {
  const dispatch = useDispatch();
  const currentlyEditedUser = useSelector(
    (state: RootState) => state.user.editedUserId
  );
  const currentlyEditedUserText = useSelector(
    (state: RootState) => state.user.editedUserText
  );
  const selectedUserId = useSelector(
    (state: RootState) => state.user.selectedUserId
  );

  const handleDelete = async () => {
    props.onDelete(props.id);
  };

  const editTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentlyEditedUserText.trim() !== "") {
      props.onUpdate(props.id, currentlyEditedUserText);
      dispatch(
        UserSlice.actions.setUserIsEdited({
          userId: "",
          userText: "",
        })
      );
    }
  };

  return (
    <Box
      className={
        selectedUserId === props.id
          ? styles.selectedUserContainer
          : styles.userContainer
      }
      onClick={() => props.onSelect(props.id)}
    >
      <div className={styles.name}>
        <div className={styles.text}>{` מזהה : ${props.serialId}   `}</div>
        <div>
          {props.id == currentlyEditedUser ? (
            <input
              className={styles.editBox}
              type="text"
              value={currentlyEditedUserText}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(
                  UserSlice.actions.setUserIsEdited({
                    userText: e.target.value,
                    userId: props.id,
                  })
                )
              }
              onKeyDown={editTaskHandler}
            />
          ) : (
            <p>שם : {props.name}</p>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.editButton}
          onClick={() =>
            dispatch(
              UserSlice.actions.setUserIsEdited({
                userId: props.id,
                userText: props.name,
              })
            )
          }
        >
          ערוך
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          מחק
        </button>
      </div>
    </Box>
  );
};
