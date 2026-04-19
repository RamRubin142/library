import { Box, Tooltip } from "@mui/material";
import styles from "./DataSectionCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useRef, useState } from "react";
type DataSectionCardProps = {
  name: string;
  id: string;
  author?: string;
  serialId: string;
  onDelete?: (id: string) => void;
  onFavoriteChange?: (id: string) => void;
  userId?: string;
  isFavorite?: boolean;
  userIsLogged?: boolean;
};

export const DataSectionCard = (props: DataSectionCardProps) => {
  const handleDelete = async () => {
    props.onDelete?.(props.id);
  };
  const setBookAsFavorite = async () => {
    props.onFavoriteChange?.(props.id);
  };
  const unFavoriteBook = async () => {
    props.onFavoriteChange?.("");
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
    <Box className={styles.bookContainer} sx={{bgcolor : "action.disabled"}}>
      <Box className={styles.dataSection}>
        <Tooltip title={props.name} disableHoverListener={!upperOverflowActive}>
          <Box className={styles.text} ref={upperTextRef}>
            {`מזהה : ${props.serialId}    שם : ${props.name}`}
          </Box>
        </Tooltip>
        {props.author ? (
          <Tooltip
            title={props.author}
            disableHoverListener={!lowerOverflowActive}
          >
            <Box className={styles.text} ref={lowerTextRef}>{`סופר : ${props.author}`}</Box>
          </Tooltip>
        ) : (
          <></>
        )}
      </Box>
      {props.userIsLogged ? (
        <Box className={styles.buttons}>
          <Box className={styles.buttonContainer}>
            {props.isFavorite ? (
              <StarIcon
                className={styles.favoriteButton}
                onClick={() => {
                  unFavoriteBook();
                }}
              />
            ) : (
              <StarBorderIcon
                className={styles.favoriteButton}
                onClick={() => {
                  setBookAsFavorite();
                }}
              />
            )}
          </Box>
          <Box className={styles.buttonContainer}>
            <DeleteIcon
              className={styles.deleteButton}
              onClick={handleDelete}
            />
          </Box>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};
