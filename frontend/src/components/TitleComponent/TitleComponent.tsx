import {  Box } from "@mui/material";
import styles from "./TitleComponent.module.css";

type titleProps = {
    size : string;
    color : string;
}

export const TitleComponent =  (props : titleProps) => {
    return (
        <Box className={styles.titleText} sx={{fontSize : props.size, color : props.color}}>
            הספריה
        </Box>
    )
}