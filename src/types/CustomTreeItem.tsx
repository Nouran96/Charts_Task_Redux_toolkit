import { TreeItemProps, TreeItemContentProps } from "@mui/lab/TreeItem";
import { DocumentNode, TypedDocumentNode } from "@apollo/client";

// Lazy Query object for countries or cities queries
export type LazyQuery = {
  query: DocumentNode | TypedDocumentNode;
  variableName: string;
};

// Props sent from parent element
type CustomProps = {
  typename?: string;
  appendNewData?: (nodeId: string, data: []) => void;
  removeCollapsedChildren?: (nodeId: string) => void;
};

export type CustomTreeItemProps = TreeItemProps & CustomProps;
export type CustomTreeItemContentProps = TreeItemContentProps & CustomProps;
