import { MockedProvider } from "@apollo/client/testing";
import { render, RenderOptions } from "@testing-library/react";
import React, { ComponentType, FC, ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { GET_CITIES, GET_CONTINENTS, GET_COUNTRIES } from "./utils/Queries";
import theme from "./Theme";
import { Provider } from "react-redux";
// import store from "./store";
import { DocumentNode, GraphQLError } from "graphql";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/reducers";

export interface GraphQLMocks {
  request: {
    query: DocumentNode;
    variables?: {};
  };
  result: {
    data?: {
      data: {
        count: number;
        results: {
          node: any;
        }[];
      };
    };
    errors?: Array<GraphQLError>;
    loading?: boolean;
  };
  error?: Error;
}

interface CustomRenderOptions {
  customMocks?: Array<GraphQLMocks>;
  preloadedState?: any;
  store?: any;
}

type UIRenderOptions = Omit<RenderOptions, "wrapper"> & CustomRenderOptions;

const graphqlMocks: Array<GraphQLMocks> = [
  {
    request: {
      query: GET_CONTINENTS,
    },
    result: {
      data: {
        data: {
          count: 1,
          results: [
            {
              node: {
                __typename: "Continentscountriescities_Continent",
                name: "Africa",
                objectId: "123456",
                children: { count: 1 },
              },
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_COUNTRIES,
      variables: { continentId: "123456" },
    },
    result: {
      data: {
        data: {
          count: 1,
          results: [
            {
              node: {
                __typename: "Continentscountriescities_Country",
                name: "Egypt",
                objectId: "23456",
                children: { count: 1 },
              },
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_CITIES,
      variables: { countryId: "23456" },
    },
    result: {
      data: {
        data: {
          count: 1,
          results: [
            {
              node: {
                __typename: "Continentscountriescities_City",
                name: "Alexandria",
                objectId: "34567",
                children: { count: 1 },
              },
            },
          ],
        },
      },
    },
  },
];

const customRender = (
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...options
  }: UIRenderOptions = {} as UIRenderOptions
) => {
  // store.dispatch = jest.fn(store.dispatch);

  const AllTheProviders: FC = ({ children }) => {
    return (
      <MockedProvider mocks={options?.customMocks || graphqlMocks}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Provider store={store}>{children}</Provider>
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
  };

  return render(ui, { wrapper: AllTheProviders as ComponentType, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
