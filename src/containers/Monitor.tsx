import React from "react";
import { Box, Typography } from "@mui/material";
import Tree from "../components/Tree";

const Monitor = () => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} minHeight="inherit">
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

      <Box flexGrow="1" borderRight={1} paddingY={1}>
        Hello
      </Box>
      <Box width={250} paddingY={1}>
        Hii
      </Box>
    </Box>
  );
};

export default Monitor;
