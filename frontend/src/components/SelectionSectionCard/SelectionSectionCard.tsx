import { Box } from "@mui/material";
import styles from "./SelectionSectionCard.module.css";
import type { KeyboardEvent, ChangeEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
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
      <Box className={styles.dataSection}>
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
              <Box className={styles.text}>{`מזהה : ${props.serialId}   שם :  ${props.name}`}</Box>
            )}
          </Box>
        </Box>
        {props.author && !props.isCurrentlyEdited ? (
          <Box className={styles.text}>{`סופר : ${props.author}`}</Box>
        ) : (
          <></>
        )}
      </Box>
      <Box className={styles.buttons}>
        <Box className={styles.buttonContainer}>
          {props.isCurrentlyEdited ? (
            <CloseIcon
              className={styles.editButton}
              onClick={() => {
                props.onEditButtonChange(null, null);
              }}
            />
          ) : (
            <EditIcon
              className={styles.editButton}
              onClick={() => {
                props.onEditButtonChange(props.id, props.name);
              }}
            />
          )}
        </Box>
        <Box className={styles.buttonContainer}>
          <DeleteIcon className={styles.deleteButton} onClick={handleDelete} />
        </Box>
      </Box>
    </Box>
  );
};
