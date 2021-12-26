import TempChart from "..";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../../../test-utils";
import { server } from "../../../mocks/server";
import { rest } from "msw";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// Mock LineChart component due to error in apexcharts rendering in testing
jest.mock("../../LineChart", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="lineChart"></div>;
    },
  };
});

describe("Temp Chart Component", () => {
  it("renders weather history line chart", async () => {
    const preloadedState = {
      weather: {
        requestedParams: {
          dt: 1640511206,
          coord: {
            lon: 67,
            lat: -43,
          },
        },
      },
    };

    render(<TempChart />, { preloadedState });

    const lineChart = await waitFor(() => screen.getByTestId("lineChart"));

    expect(lineChart).toBeInTheDocument();
  });

  it("renders error paragraph if api returns error", async () => {
    const preloadedState = {
      weather: {
        requestedParams: {
          dt: 1640511206,
          coord: {
            lon: 67,
            lat: -43,
          },
        },
      },
    };

    server.use(
      rest.get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine`,
        (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ result: { error: true } }));
        }
      )
    );

    render(<TempChart />, { preloadedState });

    const errorParagraph = await waitFor(() =>
      screen.getByText(/Error fetching weather history/i)
    );

    expect(errorParagraph).toBeInTheDocument();
  });
});
