import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../../types/Redux";
import { GET_CITY, GET_COUNTRY } from "../../utils/Queries";
import { useLazyQuery } from "@apollo/client";
import { getNodeId } from "../../utils/Shared";

const NodeDetails = () => {
  const { selectedNode } = useAppSelector((state) => state.tree);
  const [details, setDetails] = useState<{ data?: {} }>({});

  const [getCountry, { data: countryDetails, loading: countryLoading }] =
    useLazyQuery(GET_COUNTRY);

  const [getCity, { data: cityDetails, loading: cityLoading }] =
    useLazyQuery(GET_CITY);

  // Set details array with either the country or city details
  useEffect(() => {
    if (countryDetails) {
      setDetails(countryDetails);
    }
  }, [countryDetails]);

  useEffect(() => {
    if (cityDetails) {
      setDetails(cityDetails);
    }
  }, [cityDetails]);

  useEffect(() => {
    if (selectedNode) {
      setDetails({});

      switch (selectedNode.slice(0, 1)) {
        case "2":
          getCountry({ variables: { countryId: getNodeId(selectedNode) } });
          break;
        case "3":
          getCity({ variables: { cityId: getNodeId(selectedNode) } });
          break;
        default:
          break;
      }
    }
  }, [selectedNode]);

  const renderProps = () => {
    if (details && details.data) console.log(Object.entries(details?.data));
  };

  return (
    <Box>
      {Object.keys(details).length > 0 ? (
        <>{renderProps()}</>
      ) : cityLoading || countryLoading ? (
        <Box display="flex" justifyContent="center" pt={10}>
          <CircularProgress />
        </Box>
      ) : (
        <Typography>Select a country or a city</Typography>
      )}
    </Box>
  );
};

export default NodeDetails;
