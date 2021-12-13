import React, { useEffect, useState } from "react";
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
import {
  addHighestPopulatedCities,
  addSelectedNode,
} from "../../store/reducers/Tree";

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
    removeCollapsedChildren,
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
  const [getChildren, { loading, data, refetch }] = useLazyQuery(
    lazyQueryParams?.query,
    {
      variables: { [lazyQueryParams?.variableName]: getNodeId(nodeId) },
    }
  );

  const [fetchedData, setFetchedData] = useState<any>({
    data: null,
    loading: false,
  });

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  useEffect(() => {
    if (
      fetchedData?.data &&
      fetchedData?.data?.results &&
      fetchedData.data.results.length > 0 &&
      appendNewData
    ) {
      appendNewData(nodeId, fetchedData.data?.results || []);

      // Add first 10 highest populated cities for scatter chart
      if (type === "Country") {
        dispatch(
          addHighestPopulatedCities({
            data: [],
            loading: true,
          })
        );

        dispatch(
          addHighestPopulatedCities({
            data: fetchedData.data.results.slice(0, 10),
            loading: false,
          })
        );
      }
    } else if (
      fetchedData?.data?.results &&
      fetchedData.data.results.length === 0
    ) {
      dispatch(
        addHighestPopulatedCities({
          data: [],
          loading: false,
        })
      );
    }
  }, [fetchedData]);

  // Append new children to node
  useEffect(() => {
    if (data) {
      setFetchedData({ data: data.data, loading: false });
    }
  }, [data]);

  useEffect(() => {
    if (loading) {
      setFetchedData({ data: null, loading: true });
    }
  }, [loading]);

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!expanded) {
      // It has children
      if (type !== "City") {
        if (!data) getChildren();
        else {
          setFetchedData({ data: null, loading: true });

          refetch().then(({ data }) => {
            setFetchedData({ data: data.data, loading: false });
          });
        }
      }

      handleSelection(event);
    }

    if (expanded && removeCollapsedChildren) {
      removeCollapsedChildren(nodeId);
      dispatch(addSelectedNode({ id: "", type: "" }));
    }

    if (type !== "City") {
      handleExpansion(event);
    }
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

        {fetchedData.loading && (
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
        {
          typename: props.typename,
          appendNewData: props.appendNewData,
          removeCollapsedChildren: props.removeCollapsedChildren,
        } as any
      }
      {...props}
      classes={{
        group: styles.itemGroup,
        content: styles.itemContent,
      }}
    />
  );
};

export default CustomTreeItem;
