import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Box, Typography } from "@mui/material";
import ApexCharts from "apexcharts";
import Tree from "../components/Tree";
import CustomAppBar from "../components/CustomAppBar";

const Monitor = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const title = pathname.split("/").join("");
    setTitle(title ? title.slice(0, 1).toUpperCase() + title.slice(1) : title);
  }, [pathname]);

  return (
    <Box display="flex" flexWrap="wrap" minHeight="inherit">
      <Box
        sx={{ overflowY: "auto" }}
        width={250}
        borderRight={1}
        paddingY={1}
        maxHeight="100vh"
      >
        <Typography
          sx={{ color: "#3535a9", textTransform: "uppercase" }}
          borderBottom="1px solid black"
          px={2}
          gutterBottom
          variant="subtitle2"
        >
          The World
        </Typography>

        <Box px={2}>
          <Tree />
        </Box>
      </Box>

      <Box flexGrow="1" borderRight={1} sx={{ backgroundColor: "#eee" }}>
        <CustomAppBar title={title} />
      </Box>

      <Box width={250} paddingY={1}>
        Hii
      </Box>
    </Box>
  );
};

export default Monitor;
