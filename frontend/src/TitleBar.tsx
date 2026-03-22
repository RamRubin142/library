import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
export const TitleBar = () => {
  return (
    <Box sx={{border : 1}}>
      <Toolbar sx={{ bgcolor: "white" }}>
        <Typography
          color="black"
          variant="h4"
          component="div"
          sx={{ flexGrow: 2 }}
        >
          הספריה
        </Typography>
        <Box sx={{ flexDirection: "column", flexGrow:1}}>
          <Typography color="black">שלום עידן דוידי!</Typography>
          <Typography variant="caption" color="black">
            הספר האהוב עליך הוא כדכ'ק
          </Typography>
        </Box>
        <Button sx={{ bgcolor: "green", color: "white" }}>התנתק</Button>
      </Toolbar>
    </Box >
  );
};
