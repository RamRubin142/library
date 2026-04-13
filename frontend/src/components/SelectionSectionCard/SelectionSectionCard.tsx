import { Box, Typography } from "@mui/material";
import styles from "./SelectionSectionCard.module.css";
import type { KeyboardEvent, ChangeEvent } from "react";

type SelectionSectionCardProps = {
  name: string;
  id: string;
  author?: string;
  serialId: string;
  isSelected: boolean;
  isCurrentlyEdited: boolean;
  currentlyEditedText: string | null;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newName: string) => void;
  onSelect: (id: string) => void;
  onEditButtonChange: (id: string | null, text: string | null) => void;
  onEditTextChange: (id: string | null, text: string | null) => void;
};

export const SelectionSectionCard = (props: SelectionSectionCardProps) => {
  const handleDelete = async () => {
    props.onDelete(props.id);
  };

  const editTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      props.currentlyEditedText &&
      props.currentlyEditedText.trim() !== ""
    ) {
      props.onUpdate(props.id, props.currentlyEditedText);
      props.onEditButtonChange(null, null);
    }
  };

  return (
    <Box
      className={
        props.isSelected ? styles.selectedBookContainer : styles.bookContainer
      }
      onClick={() => props.onSelect(props.id)}
    >
      <Box className={styles.info}>
        <Box className={styles.name}>
          <Box>
            {props.isCurrentlyEdited ? (
              <input
                className={styles.editBox}
                type="text"
                value={props.currentlyEditedText ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  props.onEditTextChange(props.id, e.target.value);
                }}
                onKeyDown={editTaskHandler}
              />
            ) : (
              <Box>{`מזהה : ${props.serialId}   שם :  ${props.name}`}</Box>
            )}
          </Box>
        </Box>
        {props.author && !props.isCurrentlyEdited? (
          <Typography className={styles.bottomText}>
            סופר : {props.author}
          </Typography>
        ) : (
          <></>
        )}
      </Box>
      <Box className={styles.buttons}>
        <button
          className={styles.editButton}
          onClick={() => {
            if (!props.isCurrentlyEdited) {
              props.onEditButtonChange(props.id, props.name);
            } else {
              props.onEditButtonChange(null, null);
            }
          }}
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
