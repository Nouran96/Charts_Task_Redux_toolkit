import React, { useEffect } from "react";
import clsx from "clsx";
import { Typography } from "@mui/material";
import TreeItem, {
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
} from "@mui/lab/TreeItem";
import { useLazyQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../../utils/Queries";

type CustomProps = {
  typename?: string;
  appendNewData?: (nodeId: string, data: []) => void;
};
type CustomTreeItemProps = TreeItemProps & CustomProps;

type CustomTreeItemContentProps = TreeItemContentProps & CustomProps;

const CustomContent = React.forwardRef(function CustomContent(
  props: CustomTreeItemContentProps,
  ref
) {
  const {
    classes,
    className,
    label,
    nodeId,
    typename,
    appendNewData,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const [getCountries, { loading, error, data: allCountries }] = useLazyQuery(
    GET_COUNTRIES,
    { variables: { continentId: nodeId } }
  );

  const type: string = typename?.split("_")[1] || "";

  const { disabled, expanded, selected, focused, handleExpansion } =
    useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  useEffect(() => {
    if (allCountries?.data?.results && appendNewData) {
      appendNewData(nodeId, allCountries.data?.results || []);
    }
  }, [allCountries]);

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    switch (type) {
      case "Continent":
        getCountries();
        break;
      default:
        break;
    }
    handleExpansion(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onClick={handleExpansionClick}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={classes.iconContainer}>{icon}</div>
      <Typography component="div" className={classes.label}>
        {label}
      </Typography>
    </div>
  );
});

const CustomTreeItem = (props: CustomTreeItemProps) => {
  return (
    <TreeItem
      ContentComponent={CustomContent}
      ContentProps={
        { typename: props.typename, appendNewData: props.appendNewData } as any
      }
      {...props}
    />
  );
};

export default CustomTreeItem;
