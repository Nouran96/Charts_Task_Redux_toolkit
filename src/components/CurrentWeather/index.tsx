import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useAppDispatch } from "../../types/Redux";
import * as types from "../../store/actionTypes";

type CurrentWeatherProps = {
  data: {
    name: string;
    code?: string;
    location?: { latitude: number; longitude: number };
  };
};

type CurrentWeatherResponse = {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
  };
  weather: Array<{ icon: string; description: string }>;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
};

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const [weather, setWeather] = React.useState<{
    data: null | CurrentWeatherResponse;
    error: null | boolean;
  }>({ data: null, error: null });

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setWeather({ data: null, error: null });
    getCurrentWeather();

    return () => {
      dispatch({
        type: types.ADD_WEATHER_PARAMS,
        payload: { dt: null, coord: null },
      });
    };
  }, [data]);

  const getCurrentWeather = async () => {
    if (data) {
      try {
        // Get weather by coordinates if present or by name
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?${
            data?.location
              ? `lat=${data?.location.latitude}&lon=${data?.location.longitude}`
              : `q=${data?.name},${data?.code?.toLowerCase()}`
          }&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
        );

        const fetchedData = await response.json();

        if (fetchedData.cod !== 200) {
          // Error happened
          setWeather({ data: null, error: true });
        } else {
          setWeather({ data: fetchedData, error: null });
          dispatch({
            type: types.ADD_WEATHER_PARAMS,
            payload: { dt: fetchedData.dt, coord: fetchedData.coord },
          });
        }
      } catch (err: any) {
        console.error(err.response.message);
      }
    }
  };

  const renderWeatherData = () => {
    const { data } = weather;
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" gap={1} alignItems="center">
          <img
            src={`http://openweathermap.org/img/w/${data?.weather[0].icon}.png`}
            alt=""
          />
          {data?.main?.temp && (
            <Typography variant="h4">
              {Math.round(data?.main?.temp)}°
            </Typography>
          )}
        </Box>

        <Typography variant="body1">{data?.weather[0].description}</Typography>
        {data?.main?.temp_max && data?.main?.temp_min && (
          <Typography variant="subtitle2">
            {Math.round(data?.main?.temp_max)}°/
            {Math.round(data?.main?.temp_min)}°
          </Typography>
        )}
        {data?.main?.feels_like && (
          <Typography variant="subtitle2">
            Feels like {Math.round(data?.main?.feels_like)}°
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box display="flex" justifyContent="center" mb={2}>
      {!weather.data && !weather.error && <CircularProgress />}
      {weather.error && <Typography>Error to fetch weather data</Typography>}
      {weather.data &&
        Object.keys(weather.data).length > 0 &&
        renderWeatherData()}
    </Box>
  );
};

export default CurrentWeather;
