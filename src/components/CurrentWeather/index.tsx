import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useAppDispatch } from "../../types/Redux";
import moment from "moment";
import { addWeatherParams } from "../../store/reducers/Weather";
import { useLazyGetCurrentWeatherQuery } from "../../store/apis/weatherApi";

type CurrentWeatherProps = {
  data: {
    name: string;
    code?: string;
    location?: { latitude: number; longitude: number };
  };
};

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const [callGetCurrentWeather, { data: fetchedData, error, isLoading }] =
    useLazyGetCurrentWeatherQuery();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    callGetCurrentWeather(data);

    return () => {
      dispatch(addWeatherParams({ dt: null, coord: null }));
    };
  }, [data]);

  React.useEffect(() => {
    if (fetchedData) {
      dispatch(
        addWeatherParams({ dt: fetchedData.dt, coord: fetchedData.coord })
      );
    }
  }, [fetchedData]);

  const capitalizeText = (text: string): string => {
    return text
      .split(" ")
      .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderWeatherData = () => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        {fetchedData?.dt && (
          <Typography variant="caption" mb={2} fontSize={16} fontWeight="bold">
            {moment.unix(fetchedData.dt).format("D MMMM, dddd")}
          </Typography>
        )}
        <Box display="flex" gap={1} alignItems="center">
          <img
            src={`http://openweathermap.org/img/w/${fetchedData?.weather[0].icon}.png`}
            alt="weather_icon"
            width="75"
          />
          <Box>
            {fetchedData?.main?.temp && (
              <Typography variant="h4" textAlign="center">
                {Math.round(fetchedData?.main?.temp)}°
              </Typography>
            )}

            {fetchedData?.main?.feels_like && (
              <Typography variant="subtitle2">
                Feels like {Math.round(fetchedData?.main?.feels_like)}°
              </Typography>
            )}
          </Box>
        </Box>

        <Box display="flex" alignItems="baseline" mt={2} gap={2}>
          {fetchedData?.weather[0].description && (
            <Typography variant="body1">
              {capitalizeText(fetchedData?.weather[0].description)}
            </Typography>
          )}

          {fetchedData?.main?.temp_max && fetchedData?.main?.temp_min && (
            <Box display="flex" alignItems="end">
              <Typography variant="h6">
                {Math.round(fetchedData?.main?.temp_max)}°
              </Typography>

              <Typography variant="subtitle2">
                / {Math.round(fetchedData?.main?.temp_min)}°
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Card
      elevation={6}
      sx={{
        background: "linear-gradient(#cbd6f1, #6f82ad, #485e90)",
        color: "white",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="center" mb={2} color="white">
          {isLoading && <CircularProgress color="inherit" />}
          {error && <Typography>Error to fetch weather data</Typography>}
          {fetchedData &&
            Object.keys(fetchedData).length > 0 &&
            renderWeatherData()}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
