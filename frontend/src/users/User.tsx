import { Box } from "@mui/material";
import styles from "./style/User.module.css";
import { useState } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
type userProps = {
  name: string;
  id: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newName: string) => void;
  onSelect: (id: string) => void;
};

export const User = (props: userProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(props.name);
  const selectedUserId = useSelector(
    (state: RootState) => state.user.selectedUserId
  );

  const handleDelete = async () => {
    props.onDelete(props.id);
  };

  const editTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && name.trim() !== "") {
      props.onUpdate(props.id, name);
      setIsEditing(false);
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
        <div className={styles.text}>{` מזהה : ${props.id}   `}</div>
        <div>
          {isEditing ? (
            <input
              className={styles.editBox}
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              onKeyDown={editTaskHandler}
            />
          ) : (
            <p>שם : {name}</p>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.editButton}
          onClick={() => setIsEditing(true)}
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
