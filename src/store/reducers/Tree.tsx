import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../actionTypes";

type TreeReducerState = {
  selectedNode: {
    id: string;
    type: string;
  };
  expandedNodes: Array<string>;
  treeData: Array<any>;
  treeDrawerOpened: boolean;
  highestPopulatedCities: {
    data: Array<{
      node: { name: string; population: number; objectId: string };
    }>;
    loading: boolean;
  };
};

const INITIAL_STATE: TreeReducerState = {
  selectedNode: {
    id: "",
    type: "",
  },
  expandedNodes: [],
  treeData: [],
  treeDrawerOpened: false,
  highestPopulatedCities: {
    data: [],
    loading: false,
  },
};

export default function treeReducer(
  state = INITIAL_STATE,
  action: PayloadAction<any>
) {
  switch (action.type) {
    case types.ADD_SELECTED_NODES:
      return { ...state, selectedNode: action.payload };
    case types.ADD_EXPANDED_NODES:
      return { ...state, expandedNodes: action.payload };
    case types.ADD_TREE_DATA:
      return { ...state, treeData: action.payload };
    case types.TOGGLE_TREE_DRAWER:
      return { ...state, treeDrawerOpened: !state.treeDrawerOpened };
    case types.ADD_HIGHEST_POPULATED_CITIES:
      return { ...state, highestPopulatedCities: action.payload };
    default:
      return state;
  }
}
