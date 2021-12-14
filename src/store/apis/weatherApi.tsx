import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<
      CurrentWeatherResponse,
      {
        location?: { latitude: number; longitude: number };
        name: string;
        code?: string;
      }
    >({
      query: (data) =>
        `weather?${
          data?.location
            ? `lat=${data?.location.latitude}&lon=${data?.location.longitude}`
            : `q=${data?.name},${data?.code?.toLowerCase()}`
        }&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`,
    }),
    getWeatherHistory: builder.query<
      any,
      {
        lat: number;
        lon: number;
        dt: number;
      }
    >({
      query: ({ lat, lon, dt }) =>
        `onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`,
    }),
  }),
});

export const { useLazyGetCurrentWeatherQuery, useLazyGetWeatherHistoryQuery } =
  weatherApi;

export default weatherApi;
