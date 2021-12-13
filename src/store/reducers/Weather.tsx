import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RequestedParamsType = {
  dt: number | null;
  coord: {
    lon: number;
    lat: number;
  } | null;
};

type WeatherReducerState = {
  requestedParams: RequestedParamsType;
};

const initialState: WeatherReducerState = {
  requestedParams: {
    dt: null,
    coord: null,
  },
};

export const weatherSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    addWeatherParams: (state, action: PayloadAction<RequestedParamsType>) => {
      state.requestedParams = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addWeatherParams } = weatherSlice.actions;

export default weatherSlice.reducer;
