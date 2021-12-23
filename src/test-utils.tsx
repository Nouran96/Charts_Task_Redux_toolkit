import { MockedProvider } from "@apollo/client/testing";
import { render, RenderOptions } from "@testing-library/react";
import React, { ComponentType, FC, ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import {
  GET_CITIES,
  GET_CITY,
  GET_CONTINENTS,
  GET_COUNTRIES,
  GET_COUNTRY,
} from "./utils/Queries";
import theme from "./Theme";
import { Provider } from "react-redux";
// import store from "./store";
import { DocumentNode, GraphQLError } from "graphql";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/reducers";
import weatherApi from "./store/apis/weatherApi";

export interface GraphQLMocks {
  request: {
    query: DocumentNode;
    variables?: {};
  };
  result: {
    data?: {
      data: {
        count?: number;
        results?: {
          node: any;
        }[];
        capital?: string;
        code?: string;
        currency?: string;
        population?: number;
        location?: {
          latitude: number;
          longitude: number;
        };
        name?: string;
        objectId?: string;
        __typename?: string;
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
                population: 123213,
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
      query: GET_COUNTRY,
      variables: { countryId: "23456" },
    },
    result: {
      data: {
        data: {
          capital: "Cairo",
          code: "EG",
          currency: "EGP",
          name: "Egypt",
          objectId: "23456",
          __typename: "Continentscountriescities_Country",
        },
      },
    },
  },
  {
    request: {
      query: GET_CITY,
      variables: { cityId: "34567" },
    },
    result: {
      data: {
        data: {
          population: 123445,
          location: {
            latitude: -1234.2,
            longitude: 32.556,
          },
          name: "Cairo",
          objectId: "34567",
          __typename: "Continentscountriescities_City",
        },
      },
    },
  },
];

const customRender = (
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(weatherApi.middleware),
    }),
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
