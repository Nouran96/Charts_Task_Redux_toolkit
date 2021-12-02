import { PayloadAction } from "@reduxjs/toolkit";

type TreeReducerState = {
  selectedNodes: Array<string>;
};

const INITIAL_STATE: TreeReducerState = {
  selectedNodes: [],
};

export default function treeReducer(
  state = INITIAL_STATE,
  action: PayloadAction<{ type: string; payload: any }>
) {
  switch (action.type) {
    case "ADD_SELECTED_NODES":
      return { ...state, selectedNodes: action.payload };
    default:
      return state;
  }
}
