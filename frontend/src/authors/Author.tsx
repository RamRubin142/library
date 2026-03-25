import { Box } from "@mui/material";
import styles from "./style/Author.module.css";
import type { KeyboardEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { authorSlice } from "../redux/authorSlice";

type authorProps = {
  name: string;
  id: string;
  serialId : string,
  onDelete: (id: string) => void;
  onUpdate: (id: string, newName: string) => void;
  onSelect: (id: string) => void;
};

export const Author = (props: authorProps) => {
  const dispatch = useDispatch();
  const currentlyEditedAuthor = useSelector (
    (state : RootState) => state.author.editedAuthorId
  )
  const currentlyEditedAuthorText = useSelector(
    (state: RootState) => state.author.editedAuthorText
  );
  
  const selectedAuthorId = useSelector(
    (state: RootState) => state.author.selectedAuthorId
  );

  const editTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentlyEditedAuthorText.trim() !== "") {
      props.onUpdate(props.id, currentlyEditedAuthorText);
      dispatch(
        authorSlice.actions.setAuthorIsEdited({ authorId: "", authorText: "" })
      );
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
        <div className={styles.topText}>{`מזהה : ${props.serialId}   שם : `}</div>
        <div>
          {(props.id == currentlyEditedAuthor) ? (
            <input
              className={styles.editBox}
              type="text"
              value={currentlyEditedAuthorText}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(authorSlice.actions.setAuthorIsEdited({authorText : e.target.value, authorId : props.id}))
              }
              onKeyDown={editTaskHandler}
            />
          ) : (
            <p className={styles.bottomText}>{props.name}</p>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.editButton}
          onClick={() => dispatch(authorSlice.actions.setAuthorIsEdited({authorId : props.id, authorText : props.name}))}
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
