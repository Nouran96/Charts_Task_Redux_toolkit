import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Tree from "../Tree";

const WorldTree = () => {
  return (
    <>
      <Card sx={{ padding: 0 }}>
        <CardContent sx={{ padding: 0, paddingBottom: "0 !important" }}>
          <Typography
            sx={{ color: "var(--main-color)", textTransform: "uppercase" }}
            px={2}
            py={1}
            variant="subtitle2"
            fontWeight={700}
          >
            The World
          </Typography>
        </CardContent>
      </Card>

      <Box px={2} pt={2}>
        <Tree />
      </Box>
    </>
  );
};

export default WorldTree;
