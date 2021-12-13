import { configureStore } from "@reduxjs/toolkit";
import treeReducer from "./reducers/Tree";
import weatherReducer from "./reducers/Weather";

export const store = configureStore({
  reducer: {
    tree: treeReducer,
    weather: weatherReducer,
  },
});

export default store;
