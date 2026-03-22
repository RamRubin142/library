import { Box } from "@mui/material";
import styles from "./style/Author.module.css";
import { useState } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
type authorProps = {
  name: string;
  id: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newName: string) => void;
  onSelect: (id: string) => void;
};

export const Author = (props: authorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(props.name);
  const selectedAuthorId = useSelector(
    (state: RootState) => state.author.selectedAuthorId
  );

  const editTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && name.trim() !== "") {
      props.onUpdate(props.id, name);
      setIsEditing(false);
    }
  };

  return (
    <Box
      className={
        selectedAuthorId === props.id
          ? styles.selectedAuthorContainer
          : styles.authorContainer
      }
      onClick={() => props.onSelect(props.id)}
    >
      <div className={styles.name}>
        <div className={styles.topText}>{`מזהה : ${props.id}   שם : `}</div>
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
            <p className={styles.bottomText}>{name}</p>
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
        <button
          className={styles.deleteButton}
          onClick={() => {
            props.onDelete(props.id);
          }}
        >
          מחק
        </button>
      </div>
    </Box>
  );
};
