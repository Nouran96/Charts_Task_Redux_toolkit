import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Box, CardHeader, Card, Typography, CardContent } from "@mui/material";
import Tree from "../components/Tree";
import CustomAppBar from "../components/CustomAppBar";
import NodeDetails from "../components/NodeDetails";
import styles from "./styles.module.css";
import TempChart from "../components/TempChart";

const Monitor = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const title = pathname.split("/").join("");
    setTitle(title ? title.slice(0, 1).toUpperCase() + title.slice(1) : title);
  }, [pathname]);

  return (
    <Box className={styles.monitorContainer}>
      <Box className={styles.firstColumnContainer}>
        <Card sx={{ padding: 0 }}>
          <CardContent sx={{ padding: 0, paddingBottom: "0 !important" }}>
            <Typography
              sx={{ color: "var(--main-color)", textTransform: "uppercase" }}
              px={2}
              py={1}
              variant="subtitle2"
            >
              The World
            </Typography>
          </CardContent>
        </Card>

        <Box px={2} pt={2}>
          <Tree />
        </Box>
      </Box>

      <Box className={styles.secondColumnContainer}>
        <CustomAppBar title={title} />

        <NodeDetails />
      </Box>

      <Box className={styles.thirdColumnContainer}>
        <TempChart />
      </Box>
    </Box>
  );
};

export default Monitor;
