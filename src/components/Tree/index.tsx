import React, { SyntheticEvent, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import TreeView from "@mui/lab/TreeView";
import { CircularProgress, SvgIcon, Typography } from "@mui/material";
import { GET_CONTINENTS } from "../../utils/Queries";
import CustomTreeItem from "../CustomTreeItem";
import styles from "./styles.module.css";
import { getModifiedData, getNodeTypeFromID } from "../../utils/Shared";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../types/Redux";
import {
  addExpandedNodes,
  addSelectedNode,
  addTreeData,
} from "../../store/reducers/Tree";

function MinusSquare(props: any) {
  return (
    <SvgIcon
      fontSize="inherit"
      style={{ width: 14, height: 14, color: "var(--main-color)" }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: any) {
  return (
    <SvgIcon
      fontSize="inherit"
      style={{ width: 14, height: 14, color: "var(--main-color)" }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

const Tree = () => {
  // Get all continents on first render
  const [getContinents, { loading, data: allContinents, error }] =
    useLazyQuery(GET_CONTINENTS);
  const { expandedNodes, treeData } = useAppSelector((state) => state.tree);
  // Data to render all tree items from
  const [treeItemsData, setTreeItemsData] = useState(treeData);
  const [expanded, setExpanded] = useState<Array<string>>(expandedNodes);
  const dispatch = useAppDispatch();

  // Set treeItemsData with continents recieved
  useEffect(() => {
    if (allContinents?.data?.results) {
      setTreeItemsData(allContinents?.data?.results);
    }
  }, [allContinents]);

  useEffect(() => {
    if (treeData.length === 0) {
      getContinents();
    }

    // return () => {
    //   dispatch({
    //     type: types.ADD_SELECTED_NODES,
    //     payload: { id: "", type: "" },
    //   });
    // };
  }, []);

  useEffect(() => {
    dispatch(addExpandedNodes(expanded));
  }, [expanded]);

  useEffect(() => {
    dispatch(addTreeData(treeItemsData));
  }, [treeItemsData]);

  // Remove collapsed children from main array for correct rendering of nodes
  const removeCollapsedChildren = (nodeId: string) => {
    const itemsDataCopy = JSON.parse(JSON.stringify(treeItemsData));

    const newData = getModifiedData(itemsDataCopy, nodeId);

    setTreeItemsData(newData);
  };

  const handleToggle = (
    event: SyntheticEvent<Element, Event>,
    nodeIds: Array<string>
  ) => {
    // Compare newest node to other nodes if they are in the same level
    const foundOpenedNodeInTheSameLevel = nodeIds.find(
      (id) => id.startsWith(nodeIds[0].slice(0, 1)) && id !== nodeIds[0]
    );

    // Close all nodes if another one is opened in the same level
    if (nodeIds.length > 1 && foundOpenedNodeInTheSameLevel) {
      collapseAllInTheSameLevelAndDeeper(nodeIds);
      // If upper node is collapsed, collapse all inner nodes (Reclicking a node)
    } else if (nodeIds.length === 1 && nodeIds[0].slice(0, 1) !== "1") {
      setExpanded([]);
    } else {
      setExpanded(nodeIds);
    }
  };

  const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
    if (nodeId) {
      dispatch(
        addSelectedNode({ id: nodeId, type: getNodeTypeFromID(nodeId) })
      );
    }
  };

  const collapseAllInTheSameLevelAndDeeper = (nodeIds: Array<string>) => {
    let expandedArr = [];

    for (let i = 0; i < nodeIds.length; i++) {
      // Add only the newest node and any upper nodes to expanded array
      if (i === 0 || +nodeIds[i].slice(0, 1) < +nodeIds[0].slice(0, 1)) {
        expandedArr.push(nodeIds[i]);
      } else {
        removeCollapsedChildren(nodeIds[i]);
      }
    }

    setExpanded(expandedArr);
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
        removeCollapsedChildren={removeCollapsedChildren}
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
  if (error)
    return (
      <Box display="flex" justifyContent="center">
        <Typography className="error">Failed to fetch continents</Typography>
      </Box>
    );
  else if (treeItemsData)
    return (
      <TreeView
        classes={{ root: styles.treeView }}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        sx={{ height: "100%", flexGrow: 1, overflowY: "auto" }}
        expanded={expanded}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        // onNodeFocus={handleSelect}
      >
        {treeItemsData.map((continent: any) => {
          return renderChild(continent.node);
        })}
      </TreeView>
    );
  else return <></>;
};

export default Tree;
