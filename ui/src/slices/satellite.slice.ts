import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { TelemetryPacket } from "../../../types/TelemetryPacket";
import { RootState } from "../store";

const satelliteAdapter = createEntityAdapter<TelemetryPacket>();

const initialState = satelliteAdapter.getInitialState();

const satelliteSlice = createSlice({
  name: "satellite",
  initialState,
  reducers: {
    setAllSatellite: satelliteAdapter.setAll,
  },
});

export const {
  selectIds: selectSatelliteDataByIds,
  selectEntities: selectSatelliteDataEntities,
  selectAll: selectAllSatelliteData,
  selectTotal: selectSatelliteDataTotal,
  selectById: selectSatelliteDataById,
} = satelliteAdapter.getSelectors((state: RootState) => state.satellite);

export const { setAllSatellite } = satelliteSlice.actions;

export const satelliteReducer = satelliteSlice.reducer;
