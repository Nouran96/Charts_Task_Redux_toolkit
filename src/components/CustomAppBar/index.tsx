import { Typography, AppBar, Toolbar } from "@mui/material";
import styles from "./styles.module.css";

type CustomAppBarProps = {
  title: string;
};

const CustomAppBar = ({ title }: CustomAppBarProps) => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar classes={{ root: styles.toolbar }} variant="dense">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontSize: "1rem" }}
        >
          {title || "Home"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
