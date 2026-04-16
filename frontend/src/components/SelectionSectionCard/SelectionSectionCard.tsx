import { Box, Tooltip } from "@mui/material";
import styles from "./SelectionSectionCard.module.css";
import {
  type KeyboardEvent,
  type ChangeEvent,
  useEffect,
  useState,
  useRef,
} from "react";
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

  function isupperOverflowActive(event: any) {
    if (!event) return false;
    return (
      event.offsetHeight < event.scrollHeight ||
      event.offsetWidth < event.scrollWidth
    );
  }
  function islowerOverflowActive(event: any) {
    if (!event) return false;
    return (
      event.offsetHeight < event.scrollHeight ||
      event.offsetWidth < event.scrollWidth
    );
  }

  useEffect(() => {
    if (isupperOverflowActive(upperTextRef?.current)) {
      setupperOverflowActive(true);
      return;
    }

    setupperOverflowActive(false);
  }, [isupperOverflowActive]);

  const [upperOverflowActive, setupperOverflowActive] = useState(false);

  const upperTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (islowerOverflowActive(lowerTextRef?.current)) {
      setlowerOverflowActive(true);
      return;
    }

    setlowerOverflowActive(false);
  }, [islowerOverflowActive]);

  const [lowerOverflowActive, setlowerOverflowActive] = useState(false);

  const lowerTextRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box
      className={
        props.isSelected ? styles.selectedBookContainer : styles.bookContainer
      }
      onClick={() => props.onSelect(props.id)}
    >
      <Box className={styles.dataSection}>
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
            <Tooltip
              title={props.name}
              disableHoverListener={!upperOverflowActive}
            >
              <Box
                className={styles.text}
                ref={upperTextRef}
              >{`מזהה : ${props.serialId}   שם :  ${props.name}`}</Box>
            </Tooltip>
          )}
        </Box>

        {props.author && !props.isCurrentlyEdited ? (
          <Tooltip
            title={props.author}
            disableHoverListener={!lowerOverflowActive}
          >
            <Box
              className={styles.text}
              ref={lowerTextRef}
            >{`סופר : ${props.author}`}</Box>
          </Tooltip>
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
