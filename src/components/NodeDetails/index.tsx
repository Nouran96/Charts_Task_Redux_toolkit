import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import PaidIcon from "@mui/icons-material/Paid";
import { useAppSelector } from "../../types/Redux";
import { GET_CITY, GET_COUNTRY } from "../../utils/Queries";
import { useLazyQuery } from "@apollo/client";
import { getNodeId } from "../../utils/Shared";
import CurrentWeather from "../CurrentWeather";
import ScatterChart from "../ScatterChart";

const NodeDetails = () => {
  const { selectedNode, highestPopulatedCities } = useAppSelector(
    (state) => state.tree
  );
  const [details, setDetails] = useState<{ data?: any }>({});

  const [getCountry, { data: countryDetails, loading: countryLoading }] =
    useLazyQuery(GET_COUNTRY);

  const [getCity, { data: cityDetails, loading: cityLoading }] =
    useLazyQuery(GET_CITY);

  const fetchedNodeIds: {
    [key: string]: typeof cityDetails | typeof countryDetails;
  } = {};

  // Set details array with either the country or city details
  useEffect(() => {
    if (countryDetails) {
      setDetails(countryDetails);
      fetchedNodeIds[selectedNode.id] = countryDetails;
    }
  }, [countryDetails]);

  useEffect(() => {
    if (cityDetails) {
      setDetails(cityDetails);
      fetchedNodeIds[selectedNode.id] = cityDetails;
    }
  }, [cityDetails]);

  useEffect(() => {
    setDetails({});

    if (selectedNode.id) {
      switch (selectedNode.id.slice(0, 1)) {
        case "2":
          // Get country details from cache after first call
          fetchedNodeIds[selectedNode.id]
            ? setDetails(fetchedNodeIds[selectedNode.id])
            : getCountry({
                variables: { countryId: getNodeId(selectedNode.id) },
              });
          break;
        case "3":
          fetchedNodeIds[selectedNode.id]
            ? setDetails(fetchedNodeIds[selectedNode.id])
            : getCity({ variables: { cityId: getNodeId(selectedNode.id) } });
          break;
        default:
          break;
      }
    }
  }, [selectedNode]);

  const renderProps = () => {
    const nodeType = details?.data?.__typename?.split("_")[1];

    if (nodeType === "Country") {
      const { capital, currency } = details.data;

      if (!capital && !currency)
        return (
          <Box display="flex" justifyContent="center">
            <Typography className="error">No details found</Typography>
          </Box>
        );

      return (
        <Box display="flex" flexDirection="column">
          {capital && (
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ color: "var(--secondary-color)" }}
              >
                <FlagIcon color="inherit" />
                <Typography variant="subtitle2" color="black">
                  Capital
                </Typography>
              </Box>
              <Typography>{capital}</Typography>
            </Box>
          )}

          {currency && (
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ color: "var(--secondary-color)" }}
              >
                <PaidIcon color="inherit" />
                <Typography variant="subtitle2" color="black">
                  Currency
                </Typography>
              </Box>
              <Typography>{currency}</Typography>
            </Box>
          )}
        </Box>
      );
    } else if (nodeType === "City") {
      const { population, location } = details.data;

      if (!location && !population)
        return (
          <Box display="flex" justifyContent="center">
            <Typography>No details found</Typography>
          </Box>
        );

      return (
        <Box display="flex" flexDirection="column">
          {population && (
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ color: "var(--secondary-color)" }}
              >
                <PeopleAltOutlinedIcon color="inherit" />
                <Typography variant="subtitle2" color="black">
                  Population
                </Typography>
              </Box>
              <Typography>{population}</Typography>
            </Box>
          )}

          {location?.latitude && (
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ color: "var(--secondary-color)" }}
              >
                <LocationOnIcon color="inherit" />
                <Typography variant="subtitle2" color="black">
                  Latitude
                </Typography>
              </Box>
              <Typography>{location.latitude}</Typography>
            </Box>
          )}

          {location?.longitude && (
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ color: "var(--secondary-color)" }}
              >
                <LocationOnIcon color="inherit" />
                <Typography variant="subtitle2" color="black">
                  Longitude
                </Typography>
              </Box>
              <Typography>{location.longitude}</Typography>
            </Box>
          )}
        </Box>
      );
    }

    return null;
  };

  const renderLoader = () => {
    return (
      <Box display="flex" justifyContent="center" pt={10}>
        <CircularProgress />
      </Box>
    );
  };

  return (
    <Box p={1}>
      {Object.keys(details).length > 0 ? (
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h5"
            mb={2}
            textAlign="center"
            sx={{ color: "var(--main-color)" }}
          >
            {details.data?.name}
          </Typography>
          <Box
            mb={4}
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            justifyContent="center"
            alignItems="center"
            gap={3}
          >
            <Box>
              <Typography mb={2} variant="h6">
                Details
              </Typography>
              {renderProps()}
            </Box>
            <CurrentWeather data={details.data} />
          </Box>
          {selectedNode.type === "Country" &&
            (highestPopulatedCities.data.length > 0 ? (
              <ScatterChart data={highestPopulatedCities.data} />
            ) : highestPopulatedCities.loading ? (
              renderLoader()
            ) : null)}
        </Box>
      ) : cityLoading || countryLoading ? (
        renderLoader()
      ) : (
        <Typography textAlign="center" className="error">
          Select a country or a city
        </Typography>
      )}
    </Box>
  );
};

export default NodeDetails;
