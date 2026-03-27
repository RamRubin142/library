import { Box, Typography } from "@mui/material";
import styles from "./Book.module.css";
import type { KeyboardEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { BookSlice } from "../../../redux/bookSlice";

type bookProps = {
  name: string;
  id: string;
  author: string;
  serialId: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newName: string) => void;
  onSelect: (id: string) => void;
};

export const Book = (props: bookProps) => {
  const dispatch = useDispatch();
  const currentlyEditedBook = useSelector(
    (state: RootState) => state.book.editedBookId
  );
  const currentlyEditedBookText = useSelector(
    (state: RootState) => state.book.editedBookText
  );

  const selectedBookId = useSelector(
    (state: RootState) => state.book.selectedBookId
  );

  const handleDelete = async () => {
    props.onDelete(props.id);
  };

  const editTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentlyEditedBookText.trim() !== "") {
      props.onUpdate(props.id, currentlyEditedBookText);
      dispatch(
        BookSlice.actions.setBookIsEdited({
          bookId: "",
          bookText: "",
        })
      );
    }
  };

  return (
    <Box
      className={
        selectedBookId === props.id
          ? styles.selectedBookContainer
          : styles.bookContainer
      }
      onClick={() => props.onSelect(props.id)}
    >
      <Box className={styles.info}>
        <Box className={styles.name}>
          <Box>{`מזהה : ${props.serialId}   שם : `}</Box>
          <Box>
            {props.id == currentlyEditedBook ? (
              <input
                className={styles.editBox}
                type="text"
                value={currentlyEditedBookText}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(
                    BookSlice.actions.setBookIsEdited({
                      bookText: e.target.value,
                      bookId: props.id,
                    })
                  )
                }
                onKeyDown={editTaskHandler}
              />
            ) : (
              <Typography className={styles.bottomText}>
                {props.name}
              </Typography>
            )}
          </Box>
        </Box>
        <Typography className={styles.bottomText}>
          סופר : {props.author}
        </Typography>
      </Box>
      <Box className={styles.buttons}>
        <button
          className={styles.editButton}
          onClick={() =>
            dispatch(
              BookSlice.actions.setBookIsEdited({
                bookId: props.id,
                bookText: props.name,
              })
            )
          }
        >
          ערוך
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          מחק
        </button>
      </Box>
    </Box>
  );
};
