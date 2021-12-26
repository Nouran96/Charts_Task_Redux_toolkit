import NodeDetails from "..";
import {
  render,
  screen,
  cleanup,
  waitForElementToBeRemoved,
  waitFor,
} from "../../../test-utils";

jest.mock("../../ScatterChart", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="scatterChart"></div>;
    },
  };
});

afterEach(() => {
  cleanup();
});

describe("Node details Component", () => {
  it("renders country details", async () => {
    const preloadedState = {
      tree: {
        selectedNode: { id: "2_23456", type: "Country" },
      },
    };

    render(<NodeDetails />, { preloadedState });

    // wait until loading finishes
    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));
    const capitalHeading = await screen.findByRole("heading", {
      name: /capital/i,
    });

    expect(capitalHeading).toBeInTheDocument();
  });

  it("renders city details", async () => {
    const preloadedState = {
      tree: {
        selectedNode: { id: "3_34567", type: "City" },
      },
    };

    render(<NodeDetails />, { preloadedState });

    // wait until loading finishes
    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));
    const populationHeading = await screen.findByRole("heading", {
      name: /population/i,
    });

    expect(populationHeading).toBeInTheDocument();
  });

  it("renders scatter chart if country", async () => {
    const preloadedState = {
      tree: {
        selectedNode: { id: "2_23456", type: "Country" },
        highestPopulatedCities: {
          loading: false,
          data: [],
        },
      },
    };

    render(<NodeDetails />, { preloadedState });

    // wait until loading finishes
    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

    const scatterChart = await waitFor(() =>
      screen.getByTestId("scatterChart")
    );

    expect(scatterChart).toBeInTheDocument();
    // const chart = document.querySelector("#chart");

    // expect(chart).toBeTruthy();
  });

  it("doesn't render scatter chart if city", async () => {
    const preloadedState = {
      tree: {
        selectedNode: { id: "3_34567", type: "City" },
        highestPopulatedCities: {
          loading: false,
          data: [],
        },
      },
    };

    render(<NodeDetails />, { preloadedState });

    // wait until loading finishes
    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

    const scatterChart = await waitFor(() =>
      screen.queryByTestId("scatterChart")
    );

    expect(scatterChart).not.toBeInTheDocument();
    // const chart = document.querySelector("#chart");

    // expect(chart).not.toBeTruthy();
  });
});
