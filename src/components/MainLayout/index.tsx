import React from "react";
import { Box } from "@mui/material";
import SideDrawer from "../SideDrawer";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box display="flex">
      <SideDrawer />

      <Box sx={{ flexGrow: 1 }}>
        <Box minHeight="100vh">{children}</Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
