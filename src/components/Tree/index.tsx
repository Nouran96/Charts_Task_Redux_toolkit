import React, { useEffect, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client";
import { GET_CONTINENTS } from "../../utils/Queries";
import { CircularProgress } from "@mui/material";
import CustomTreeItem from "../CustomTreeItem";

const Tree = () => {
  const { loading, error, data: allContinents } = useQuery(GET_CONTINENTS);
  const [treeItemsData, setTreeItemsData] = useState<any[]>([]);

  useEffect(() => {
    if (allContinents?.data?.results) {
      setTreeItemsData(allContinents?.data?.results);
    }
  }, [allContinents]);

  const appendNewData = (nodeId: string, data: []) => {
    const treeItemsDataClone: any[] = JSON.parse(JSON.stringify(treeItemsData));

    const nodeIndex = treeItemsDataClone.findIndex(
      (item: any) => item.node.objectId === nodeId
    );

    if (nodeIndex >= 0) {
      treeItemsDataClone[nodeIndex].node.children = data;
      setTreeItemsData(treeItemsDataClone);
    }
  };

  const renderChildren = (node: any) => {
    return (
      <CustomTreeItem
        key={node.objectId}
        classes={{ content: styles.treeItemContent }}
        typename={node.__typename}
        appendNewData={appendNewData}
        nodeId={node.objectId}
        label={node.name}
      >
        {/* Dummy item to show expand arrow */}
        {node.children &&
          (node.children.count > 0 ? (
            <CustomTreeItem nodeId="1" />
          ) : (
            node.children.length &&
            node.children.map((child: any) => renderChildren(child.node))
          ))}
      </CustomTreeItem>
    );
  };

  if (loading) return <CircularProgress />;
  else if (allContinents)
    return (
      <TreeView
        classes={{ root: styles.treeView }}
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {treeItemsData.map((continent: any) => {
          return renderChildren(continent.node);
        })}
      </TreeView>
    );
  else return <></>;
};

export default Tree;
