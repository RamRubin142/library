import { Box } from "@mui/material";
import styles from "./style/Book.module.css";
import { useState } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
type bookProps = {
  name: string;
  id: string;
  author: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newName: string) => void;
  onSelect: (id: string) => void;
};

export const Book = (props: bookProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(props.name);
  const selectedBookId = useSelector(
    (state: RootState) => state.book.selectedBookId
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
  console.log(props);

  return (
    <Box
      className={
        selectedBookId === props.id
          ? styles.selectedBookContainer
          : styles.bookContainer
      }
      onClick={() => props.onSelect(props.id)}
    >
      <div className={styles.info}>
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
        <p className={styles.bottomText}>סופר : {props.author}</p>
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
