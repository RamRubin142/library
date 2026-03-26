import { Box } from "@mui/material";
import styles from "./style/User.module.css";

type userProps = {
  name: string;
  id: string;
  serialId :string;
  onDelete: (id: string) => void;
};

export const User = (props: userProps) => {

  const handleDelete = async () => {
    props.onDelete(props.id);
  };

  return (
    <Box className={styles.userContainer}>
      <Box className={styles.name}>
        <Box className={styles.text}>{` מזהה : ${props.serialId}  שם : ${props.name} `}</Box>
      </Box>
      <Box className={styles.buttons}>
        <button className={styles.deleteButton} onClick={handleDelete}>
          מחק
        </button>
      </Box>
    </Box>
  );
};
