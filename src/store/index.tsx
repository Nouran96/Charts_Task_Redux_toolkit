import { configureStore } from "@reduxjs/toolkit";
import weatherApi from "./apis/weatherApi";
import treeReducer from "./reducers/Tree";
import weatherReducer from "./reducers/Weather";

export const store = configureStore({
  reducer: {
    tree: treeReducer,
    weather: weatherReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export default store;
