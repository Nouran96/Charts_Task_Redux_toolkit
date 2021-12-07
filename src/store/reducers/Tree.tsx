import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../actionTypes";

type TreeReducerState = {
  selectedNode: {
    id: string;
    type: string;
  };
  highestPopulatedCities: {
    data: Array<{
      node: { name: string; population: number; objectId: string };
    }>;
    loading: boolean;
    error: boolean;
  };
};

const INITIAL_STATE: TreeReducerState = {
  selectedNode: {
    id: "",
    type: "",
  },
  highestPopulatedCities: {
    data: [],
    loading: false,
    error: false,
  },
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
