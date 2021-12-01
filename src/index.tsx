import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const httpLink = createHttpLink({
  uri: "https://parseapi.back4app.com/graphql",
});

const headersLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-Parse-Application-Id": "cQx9FXrGccFyFcg3TW5OJIVzMIN8am4vxVXnbqcN",
      "X-Parse-Master-Key": "keRE8N32W3A5DMwXoe5yUlWYXsyfmdHrxDSeYtnh",
      "X-Parse-REST-API-Key": "pgl2vn1XqyQQdEcg4usLa75JKD1gPpvfM4OPg0FQ",
    },
  };
});

const client = new ApolloClient({
  link: headersLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
