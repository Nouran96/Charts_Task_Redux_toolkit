const weatherAPIBaseUrl = "https://api.openweathermap.org/data/2.5";

export const getWeatherHistoryData = async (
  lat: number,
  lon: number,
  dt: number
) => {
  const response = await fetch(
    `${weatherAPIBaseUrl}/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
  );

  return await response.json();
};

export const getCurrentWeatherData = async (data: {
  location?: { latitude: number; longitude: number };
  name: string;
  code?: string;
}) => {
  const response = await fetch(
    `${weatherAPIBaseUrl}/weather?${
      data?.location
        ? `lat=${data?.location.latitude}&lon=${data?.location.longitude}`
        : `q=${data?.name},${data?.code?.toLowerCase()}`
    }&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
  );

  return await response.json();
};
