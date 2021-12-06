import { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../actionTypes";

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

const INITIAL_STATE: WeatherReducerState = {
  requestedParams: {
    dt: null,
    coord: null,
  },
};

export default function weatherReducer(
  state = INITIAL_STATE,
  action: PayloadAction<RequestedParamsType>
) {
  switch (action.type) {
    case types.ADD_WEATHER_PARAMS:
      return { ...state, requestedParams: action.payload };
    default:
      return state;
  }
}
