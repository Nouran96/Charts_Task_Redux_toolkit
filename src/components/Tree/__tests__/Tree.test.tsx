import { GraphQLError } from "graphql";
import Tree from "..";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "../../../test-utils";
import { GET_CONTINENTS } from "../../../utils/Queries";

afterEach(() => {
  cleanup();
});

describe("Tree Component", () => {
  it("renders the tree after calling continents", async () => {
    render(<Tree />);
    const treeView = await screen.findByRole("tree");
    expect(treeView).toBeInTheDocument();
  });

  it("doesn't render the tree if error occurs in graphql", async () => {
    const customMocks = [
      {
        request: {
          query: GET_CONTINENTS,
        },
        result: {
          errors: [new GraphQLError("Error!")],
        },
      },
    ];

    render(<Tree />, { customMocks });
    const failedToFetchParagraph = await screen.findByText(/failed to fetch/i);
    expect(failedToFetchParagraph).toBeInTheDocument();
  });

  it("renders the same number of tree items as that of api call", async () => {
    const mockedResults = [
      { node: { name: "Africa", objectId: "123456", children: { count: 1 } } },
    ];

    const customMocks = [
      {
        request: {
          query: GET_CONTINENTS,
        },

        result: {
          data: {
            data: {
              count: mockedResults.length,
              results: mockedResults,
            },
          },
        },
      },
    ];

    render(<Tree />, { customMocks });
    const treeItems = await screen.findAllByRole("treeitem");
    expect(treeItems.length).toBe(mockedResults.length);
  });

  it("renders countries tree items when continent clicked", async () => {
    render(<Tree />);

    const continentTreeItem = await screen.findByTestId(/^1/);
    fireEvent.click(continentTreeItem);

    const countriesTreeItem = await screen.findByTestId(/^2/);

    expect(countriesTreeItem).toBeInTheDocument();
  });

  it("collapses countries tree items when continent clicked twice", async () => {
    render(<Tree />);

    const continentTreeItem = await screen.findByTestId(/^1/);
    fireEvent.click(continentTreeItem);

    let countryTreeItem: HTMLElement | null = await screen.findByTestId(/^2/);
    fireEvent.click(continentTreeItem);

    countryTreeItem = await waitFor(() => screen.queryByTestId(/^2/));

    expect(countryTreeItem).toBeNull();
  });

  it("renders cities tree items when country clicked", async () => {
    render(<Tree />);

    const continentTreeItem = await screen.findByTestId(/^1/);
    fireEvent.click(continentTreeItem);

    const countryTreeItem = await screen.findByTestId(/^2/);
    fireEvent.click(countryTreeItem);

    const cityTreeItem = await screen.findByTestId(/^3/);

    expect(cityTreeItem).toBeInTheDocument();
  });

  it("doesn't render nodes when city is clicked", async () => {
    render(<Tree />);

    const continentTreeItem = await screen.findByTestId(/^1/);
    fireEvent.click(continentTreeItem);

    const countryTreeItem = await screen.findByTestId(/^2/);
    fireEvent.click(countryTreeItem);

    const cityTreeItem = await screen.findByTestId(/^3/);
    fireEvent.click(cityTreeItem);

    expect(
      cityTreeItem.nextElementSibling?.querySelector("li")
    ).not.toBeTruthy();
  });
});
