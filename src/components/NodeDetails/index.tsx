import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../../types/Redux";
import { GET_CITY, GET_COUNTRY } from "../../utils/Queries";
import { useLazyQuery } from "@apollo/client";
import { getNodeId } from "../../utils/Shared";
import CurrentWeather from "../CurrentWeather";

const NodeDetails = () => {
  const { selectedNode } = useAppSelector((state) => state.tree);
  const [details, setDetails] = useState<{ data?: any }>({});

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
    const nodeType = details?.data?.__typename?.split("_")[1];

    if (nodeType === "Country") {
      return (
        <Box display="flex" flexDirection="column">
          {details.data.capital && (
            <Box display="flex" gap={1} alignItems="baseline">
              <Typography variant="subtitle2">Capital: </Typography>
              <Typography>{details.data.capital}</Typography>
            </Box>
          )}

          {details.data.currency && (
            <Box display="flex" gap={1} alignItems="baseline">
              <Typography variant="subtitle2">Currency: </Typography>
              <Typography>{details.data.currency}</Typography>
            </Box>
          )}
        </Box>
      );
    } else if (nodeType === "City") {
      return (
        <Box display="flex" flexDirection="column">
          <Box display="flex" gap={1} alignItems="baseline">
            <Typography variant="subtitle2">Population: </Typography>
            <Typography>{details.data.population}</Typography>
          </Box>

          <Box display="flex" gap={1} alignItems="baseline">
            <Typography variant="subtitle2">Latitude: </Typography>
            <Typography>{details.data.location.latitude}</Typography>
          </Box>

          <Box display="flex" gap={1} alignItems="baseline">
            <Typography variant="subtitle2">Longitude: </Typography>
            <Typography>{details.data.location.longitude}</Typography>
          </Box>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box p={1}>
      {Object.keys(details).length > 0 ? (
        <Box display="flex" flexDirection="column">
          <Typography variant="h5" mb={2} textAlign="center">
            {details.data?.name}
          </Typography>
          <CurrentWeather
            name={details.data.name}
            location={details.data.location}
            code={details.data.code}
          />
          <Box>{renderProps()}</Box>
        </Box>
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
