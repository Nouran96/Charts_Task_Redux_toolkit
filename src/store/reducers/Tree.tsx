import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../actionTypes";

type TreeReducerState = {
  selectedNode: string;
};

const INITIAL_STATE: TreeReducerState = {
  selectedNode: "",
};

export default function treeReducer(
  state = INITIAL_STATE,
  action: PayloadAction<string>
) {
  switch (action.type) {
    case types.ADD_SELECTED_NODES:
      return { ...state, selectedNode: action.payload };
    default:
      return state;
  }
}
