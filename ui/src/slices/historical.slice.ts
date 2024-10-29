import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { TelemetryPacket } from "../../../types/TelemetryPacket";
import { RootState } from "../store";

const historicalAdapter = createEntityAdapter<TelemetryPacket>();

const initialState = historicalAdapter.getInitialState();

const historicalSlice = createSlice({
  name: "historical",
  initialState,
  reducers: {
    addOneHistorical: historicalAdapter.addOne,
    updateOneHistorical: historicalAdapter.updateOne,
    removeOneHistorical: historicalAdapter.removeOne,
    setAllHistorical: historicalAdapter.setAll,
  },
});

export const {
  selectIds: selectHistoricalDataByIds,
  selectEntities: selectHistoricalDataEntities,
  selectAll: selectAllHistoricalData,
  selectTotal: selectHistoricalDataTotal,
  selectById: selectHistoricalDataById,
} = historicalAdapter.getSelectors((state: RootState) => state.historical);

export const {
  addOneHistorical,
  updateOneHistorical,
  removeOneHistorical,
  setAllHistorical,
} = historicalSlice.actions;

export const historicalReducer = historicalSlice.reducer;
