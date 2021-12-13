import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: TreeReducerState = {
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

export const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    addSelectedNode: (
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) => {
      state.selectedNode = action.payload;
    },
    addExpandedNodes: (state, action: PayloadAction<Array<string>>) => {
      state.expandedNodes = action.payload;
    },
    addTreeData: (state, action: PayloadAction<Array<any>>) => {
      state.treeData = action.payload;
    },
    addHighestPopulatedCities: (
      state,
      action: PayloadAction<{
        data: Array<{
          node: { name: string; population: number; objectId: string };
        }>;
        loading: boolean;
      }>
    ) => {
      state.highestPopulatedCities = action.payload;
    },
    toggleTreeDrawerState: (state) => {
      state.treeDrawerOpened = !state.treeDrawerOpened;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSelectedNode,
  addExpandedNodes,
  addTreeData,
  addHighestPopulatedCities,
  toggleTreeDrawerState,
} = treeSlice.actions;

export default treeSlice.reducer;
