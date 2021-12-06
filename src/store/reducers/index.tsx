import { combineReducers } from "redux";
import treeReducer from "./Tree";
import weatherReducer from "./Weather";

const rootReducer = combineReducers({
  tree: treeReducer,
  weather: weatherReducer,
});

export default rootReducer;
