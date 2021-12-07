import React, { SyntheticEvent, useEffect, useState } from "react";
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
import { useAppDispatch } from "../../types/Redux";
import * as types from "../../store/actionTypes";

const Tree = () => {
  // Get all continents on first render
  const { loading, data: allContinents } = useQuery(GET_CONTINENTS);
  // Data to render all tree items from
  const [treeItemsData, setTreeItemsData] = useState([]);
  const [expanded, setExpanded] = useState<Array<string>>([]);
  const dispatch = useAppDispatch();

  // Set treeItemsData with continents recieved
  useEffect(() => {
    if (allContinents?.data?.results) {
      setTreeItemsData(allContinents?.data?.results);
    }
  }, [allContinents]);

  useEffect(() => {
    return () => {
      dispatch({
        type: types.ADD_SELECTED_NODES,
        payload: { id: "", type: "" },
      });
    };
  }, []);

  const handleToggle = (
    event: SyntheticEvent<Element, Event>,
    nodeIds: Array<string>
  ) => {
    const foundOpenedNodeInTheSameLevel = nodeIds.find(
      (id) => id.startsWith(nodeIds[0].slice(0, 1)) && id !== nodeIds[0]
    );

    if (nodeIds.length > 1 && foundOpenedNodeInTheSameLevel) {
      collapseAllInTheSameLevelAndDeeper(nodeIds);
    } else {
      setExpanded(nodeIds);
    }
  };

  const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
    if (nodeId) {
      dispatch({
        type: types.ADD_SELECTED_NODES,
        payload: { id: nodeId, type: getNodeTypeFromID(nodeId) },
      });
    }
  };

  const getNodeTypeFromID = (id: string): string => {
    switch (id.slice(0, 1)) {
      case "1":
        return "Continent";
      case "2":
        return "Country";
      case "3":
        return "City";
      default:
        return "";
    }
  };

  const collapseAllInTheSameLevelAndDeeper = (nodeIds: Array<string>) => {
    setExpanded(
      nodeIds.filter(
        (id, index) => +id.slice(0, 1) < +nodeIds[0].slice(0, 1) || index === 0
      )
    );
  };

  // Add new data in its correct place in treeItemsData array
  const appendNewData = (nodeId: string, data: []) => {
    const treeItemsDataClone = JSON.parse(JSON.stringify(treeItemsData));

    const newData = getModifiedData(treeItemsDataClone, nodeId, data);

    setTreeItemsData(newData);
  };

  // Render children items recursively
  const renderChild = (node: any, level: number = 1) => {
    return (
      <CustomTreeItem
        key={node.objectId}
        classes={{ content: styles.treeItemContent }}
        typename={node.__typename}
        appendNewData={appendNewData}
        // Add a level starting from 1 and above to know whick level we are in
        nodeId={`${level}_${node.objectId}`}
        label={node.name}
      >
        {/* If children is an object with a count key > 0, render a dummy treeItem to show expand icon on parent node */}
        {node.children &&
          (node.children.count > 0 ? (
            <CustomTreeItem nodeId="1" />
          ) : (
            node.children.length &&
            node.children.map((child: any) =>
              renderChild(child.node, level + 1)
            )
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
        expanded={expanded}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        {treeItemsData.map((continent: any) => {
          return renderChild(continent.node);
        })}
      </TreeView>
    );
  else return <></>;
};

export default Tree;
