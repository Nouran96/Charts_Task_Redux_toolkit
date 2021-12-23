import CurrentWeather from "..";
import {
  render,
  screen,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
} from "../../../test-utils";
import { server } from "../../../mocks/server";
import { rest } from "msw";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Current weather Component", () => {
  it("renders weather data for country", async () => {
    const countryData = {
      name: "Egypt",
      code: "EG",
    };

    render(<CurrentWeather data={countryData} />);

    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

    const errorParagraph = await waitFor(() =>
      screen.queryByText(/Error to fetch weather data/i)
    );

    expect(errorParagraph).not.toBeInTheDocument();
  });

  it("renders error paragraph if api returns error", async () => {
    const countryData = {
      name: "Egypt",
      code: "EG",
    };

    server.use(
      rest.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(<CurrentWeather data={countryData} />);

    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

    const errorParagraph = await waitFor(() =>
      screen.queryByText(/Error to fetch weather data/i)
    );

    expect(errorParagraph).toBeInTheDocument();
  });
});
