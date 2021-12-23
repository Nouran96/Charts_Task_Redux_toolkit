import { configureStore } from "@reduxjs/toolkit";
import weatherApi from "./apis/weatherApi";
import rootReducer from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export default store;
