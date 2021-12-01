import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import SideDrawer from "../SideDrawer";
import { useLocation } from "react-router";
import styles from "./styles.module.css";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const title = pathname.split("/").join("");
    setTitle(title ? title.slice(0, 1).toUpperCase() + title.slice(1) : title);
  }, [pathname]);

  return (
    <Box display="flex">
      <SideDrawer />

      <Box sx={{ flexGrow: 1 }}>
        {/* <AppBar position="static">
          <Toolbar classes={{ root: styles.toolbar }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title || "Home"}
            </Typography>
          </Toolbar>
        </AppBar> */}

        <Box m={2}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
