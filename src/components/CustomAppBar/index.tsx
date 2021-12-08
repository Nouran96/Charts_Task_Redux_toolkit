import { Typography, AppBar, Toolbar, Card, CardContent } from "@mui/material";
import styles from "./styles.module.css";

type CustomAppBarProps = {
  title: string;
};

const CustomAppBar = ({ title }: CustomAppBarProps) => {
  return (
    <Card sx={{ padding: 0, marginBottom: 1 }}>
      <CardContent sx={{ padding: 0, paddingBottom: "0 !important" }}>
        <AppBar position="static" elevation={0}>
          <Toolbar classes={{ root: styles.toolbar }} variant="dense">
            <Typography
              sx={{ color: "var(--main-color)", textTransform: "uppercase" }}
              variant="subtitle2"
              py={1}
            >
              {title || "Home"}
            </Typography>
          </Toolbar>
        </AppBar>
      </CardContent>
    </Card>
  );
};

export default CustomAppBar;
