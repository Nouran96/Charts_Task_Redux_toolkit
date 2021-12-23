import weatherApi from "../apis/weatherApi";
import treeReducer from "./Tree";
import weatherReducer from "./Weather";

const rootReducer = {
  tree: treeReducer,
  weather: weatherReducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
};

export default rootReducer;
