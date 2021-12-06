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
          sx={{ color: "#3535a9", textTransform: "uppercase" }}
          variant="subtitle2"
        >
          {title || "Home"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
