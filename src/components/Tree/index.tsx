import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import TreeView from "@mui/lab/TreeView";
import { CircularProgress } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { GET_CONTINENTS } from "../../utils/Queries";
import CustomTreeItem from "../CustomTreeItem";
import styles from "./styles.module.css";
import { getModifiedData } from "../../utils/Shared";
import { Box } from "@mui/system";

const Tree = () => {
  // Get all continents on first render
  const { loading, data: allContinents } = useQuery(GET_CONTINENTS);
  // Data to render all tree items from
  const [treeItemsData, setTreeItemsData] = useState([]);

  // Set treeItemsData with continents recieved
  useEffect(() => {
    if (allContinents?.data?.results) {
      setTreeItemsData(allContinents?.data?.results);
    }
  }, [allContinents]);

  // Add new data in its correct place in treeItemsData array
  const appendNewData = (nodeId: string, data: []) => {
    const treeItemsDataClone = JSON.parse(JSON.stringify(treeItemsData));

    const newData = getModifiedData(treeItemsDataClone, nodeId, data);

    setTreeItemsData(newData);
  };

  // Render children items recursively
  const renderChild = (node: any) => {
    return (
      <CustomTreeItem
        key={node.objectId}
        classes={{ content: styles.treeItemContent }}
        typename={node.__typename}
        appendNewData={appendNewData}
        nodeId={node.objectId}
        label={node.name}
      >
        {/* If children is an object with a count key > 0, render a dummy treeItem to show expand icon on parent node */}
        {node.children &&
          (node.children.count > 0 ? (
            <CustomTreeItem nodeId="1" />
          ) : (
            node.children.length &&
            node.children.map((child: any) => renderChild(child.node))
          ))}
      </CustomTreeItem>
    );
  };

  // Show a loader until query resolve
  if (loading)
    return (
      <Box display="flex" justifyContent="center" paddingTop={10}>
        <CircularProgress />
      </Box>
    );
  else if (allContinents)
    return (
      <TreeView
        classes={{ root: styles.treeView }}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: "100%", flexGrow: 1, overflowY: "auto" }}
      >
        {treeItemsData.map((continent: any) => {
          return renderChild(continent.node);
        })}
      </TreeView>
    );
  else return <></>;
};

export default Tree;
