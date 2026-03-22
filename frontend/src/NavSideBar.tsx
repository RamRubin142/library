import Button from "@mui/material/Button";
import { Box, ButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import { selectSection } from "./redux/pageSlice";
import { useDispatch } from "react-redux";
const buttonStyle = {
  backgroundColor: "white",
  color: "black",
};

const selectedButtonStyle = {
  backgroundColor: "blue",
  color: "white",
};

export const NavSideBar = () => {
  const selectedSection = useSelector(
    (state: RootState) => state.page.selectedSection
  );
  const dispatch = useDispatch();

  return (
    <Box sx={{ border: 1, height: "100vh" }}>
      <ButtonGroup orientation="vertical" aria-label="Vertical button group">
        <Button
          sx={selectedSection == "USERS" ? selectedButtonStyle : buttonStyle}
          onClick={() => {
            dispatch(selectSection("USERS"));
          }}
        >
          ניהול משתמשים
        </Button>
        <Button
          sx={selectedSection == "BOOKS" ? selectedButtonStyle : buttonStyle}
          onClick={() => {
            dispatch(selectSection("BOOKS"));
          }}
        >
          ניהול ספרים
        </Button>
        <Button
          sx={selectedSection == "AUTHORS" ? selectedButtonStyle : buttonStyle}
          onClick={() => {
            dispatch(selectSection("AUTHORS"));
          }}
        >
          ניהול סופרים
        </Button>
      </ButtonGroup>
    </Box>
  );
};
