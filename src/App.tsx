import React from "react";
import { Box } from "@mui/material";
import SideDrawer from "./components/SideDrawer";
import MainRoutes from "./routes";

function App() {
  return (
    <Box display="flex" columnGap={3}>
      <SideDrawer />
      <MainRoutes />
    </Box>
  );
}

export default App;
