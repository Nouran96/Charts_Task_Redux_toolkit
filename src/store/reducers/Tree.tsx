import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../actionTypes";

type TreeReducerState = {
  selectedNode: string;
  highestPopulatedCities: Array<{
    node: { name: string; population: number; objectId: string };
  }>;
};

const INITIAL_STATE: TreeReducerState = {
  selectedNode: "",
  highestPopulatedCities: [],
};

export default function treeReducer(
  state = INITIAL_STATE,
  action: PayloadAction<any>
) {
  switch (action.type) {
    case types.ADD_SELECTED_NODES:
      return { ...state, selectedNode: action.payload };
    case types.ADD_HIGHEST_POPULATED_CITIES:
      return { ...state, highestPopulatedCities: action.payload };
    default:
      return state;
  }
}
