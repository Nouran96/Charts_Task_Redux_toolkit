import React, { useEffect } from "react";
import clsx from "clsx";
import { CircularProgress, Typography } from "@mui/material";
import TreeItem, { useTreeItem } from "@mui/lab/TreeItem";
import { Box } from "@mui/system";
import { useLazyQuery } from "@apollo/client";
import { GET_COUNTRIES, GET_CITIES } from "../../utils/Queries";
import {
  CustomTreeItemContentProps,
  LazyQuery,
  CustomTreeItemProps,
} from "../../types/CustomTreeItem";
import styles from "./styles.module.css";
import { getNodeId } from "../../utils/Shared";
import { useAppDispatch } from "../../types/Redux";
import { ADD_HIGHEST_POPULATED_CITIES } from "../../store/actionTypes";

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

  const dispatch = useAppDispatch();

  // Extract last part from Typename key of node from graphql
  // Ex: Continentscountriescities_Country => Country
  const type: string = typename?.split("_")[1] || "";

  let lazyQueryParams: LazyQuery = {} as LazyQuery;

  // Add lazyQueryParams according to type of node
  switch (type) {
    case "Continent":
      lazyQueryParams = {
        query: GET_COUNTRIES,
        variableName: "continentId",
      };
      break;
    case "Country":
      lazyQueryParams = {
        query: GET_CITIES,
        variableName: "countryId",
      };
      break;
    default:
      lazyQueryParams = {
        query: GET_COUNTRIES,
        variableName: "continentId",
      };
      break;
  }

  // Lazy query for getting children of this node
  const [getChildren, { loading, data }] = useLazyQuery(
    lazyQueryParams?.query,
    {
      variables: { [lazyQueryParams?.variableName]: getNodeId(nodeId) },
    }
  );

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  // Append new children to node
  useEffect(() => {
    if (data?.data?.results && data.data.results.length > 0 && appendNewData) {
      appendNewData(nodeId, data.data?.results || []);

      // Add first 10 highest populated cities for scatter chart
      if (type === "Country") {
        dispatch({
          type: ADD_HIGHEST_POPULATED_CITIES,
          payload: data.data.results.slice(0, 10),
        });
      }
    }
  }, [data]);

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!data && type !== "City") {
      getChildren();
    }

    handleSelection(event);
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
      <Box display="flex" justifyContent="center" gap={3}>
        <Typography
          component="div"
          className={clsx(classes.label, { [styles.expandedState]: expanded })}
        >
          {label}
        </Typography>

        {loading && (
          <Box>
            <CircularProgress size={15} />
          </Box>
        )}
      </Box>
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
