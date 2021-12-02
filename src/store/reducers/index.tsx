import { combineReducers } from "redux";
import treeReducer from "./Tree";

const rootReducer = combineReducers({ tree: treeReducer });

export default rootReducer;
