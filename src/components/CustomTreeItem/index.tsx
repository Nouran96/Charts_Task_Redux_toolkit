import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { CircularProgress, Typography } from "@mui/material";
import TreeItem, {
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
} from "@mui/lab/TreeItem";
import { useLazyQuery } from "@apollo/client";
import { GET_COUNTRIES, GET_CITIES } from "../../utils/Queries";
import { Box } from "@mui/system";

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

  const [
    getCountries,
    { loading: countriesLoading, error, data: allCountries },
  ] = useLazyQuery(GET_COUNTRIES, { variables: { continentId: nodeId } });

  const [getCities, { loading: citiesLoading, data: allCities }] = useLazyQuery(
    GET_CITIES,
    {
      variables: { countryId: nodeId },
    }
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const type: string = typename?.split("_")[1] || "";

  const { disabled, expanded, selected, focused, handleExpansion } =
    useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  useEffect(() => {
    if (countriesLoading || citiesLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [countriesLoading, citiesLoading]);

  useEffect(() => {
    if (allCountries?.data?.results && appendNewData) {
      appendNewData(nodeId, allCountries.data?.results || []);
    }
  }, [allCountries]);

  useEffect(() => {
    if (allCities?.data?.results && appendNewData) {
      appendNewData(nodeId, allCities.data?.results || []);
    }
  }, [allCities]);

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    switch (type) {
      case "Continent":
        getCountries();
        break;
      case "Country":
        getCities();
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
      <Box display="flex" justifyContent="center" gap={3}>
        <Typography component="div" className={classes.label}>
          {label}
        </Typography>

        {isLoading && <CircularProgress />}
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
