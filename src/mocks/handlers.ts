import { rest } from "msw";

export const handlers = [
  // Handles a GET to current weather api
  rest.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          result: {
            data: {
              dt: 1640267780,
              coord: { lat: -43, lon: 67 },
              weather: [{ description: "overcast clouds", icon: "04d" }],
              main: {
                feels_like: 13.83,
                temp: 14.12,
                temp_max: 14.12,
                temp_min: 14.12,
              },
            },
          },
        })
      );
    }
  ),
  // Handles a GET to history weather api
  rest.get(
    `https://api.openweathermap.org/data/2.5/onecall/timemachine`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          hourly: [
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
            {
              dt: 1640390400,
              temp: 9.14,
            },
          ],
        })
      );
    }
  ),
];
