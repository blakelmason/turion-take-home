import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TelemetryPacket } from "../../../types/TelemetryPacket";
import { RootState } from "../store";

const liveAdapter = createEntityAdapter<TelemetryPacket>({
  sortComparer: (a, b) => b.epoch_timestamp - a.epoch_timestamp,
});

const initialState = liveAdapter.getInitialState();

const MAX_RECORDS = 20;

const liveSlice = createSlice({
  name: "live",
  initialState,
  reducers: {
    addOneLive: (state, action: PayloadAction<TelemetryPacket>) => {
      if (state.ids.length >= MAX_RECORDS) {
        // Find the oldest entry
        const oldestId = state.ids[state.ids.length - 1];
        liveAdapter.removeOne(state, oldestId);
      }
      liveAdapter.addOne(state, action);
    },
    updateOneLive: liveAdapter.updateOne,
    removeOneLive: liveAdapter.removeOne,
    setAllLive: liveAdapter.setAll,
  },
});

export const {
  selectIds: selectLiveDataByIds,
  selectEntities: selectLiveDataEntities,
  selectAll: selectAllLiveData,
  selectTotal: selectLiveDataTotal,
  selectById: selectLiveDataById,
} = liveAdapter.getSelectors((state: RootState) => state.live);

export const { addOneLive, updateOneLive, removeOneLive, setAllLive } =
  liveSlice.actions;

export const liveReducer = liveSlice.reducer;
