import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { View, VIEW } from "../constants";
import { RootState } from "../store";

interface ViewState {
  current: View;
  satelliteSelect: string;
  dateSelect?: number;
}

const initialState: ViewState = {
  current: VIEW.LIVE,
  satelliteSelect: "",
  dateSelect: undefined,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setCurrentView(state, action: PayloadAction<View>) {
      state.current = action.payload;
    },
    setSatelliteSelect(state, action: PayloadAction<string>) {
      state.satelliteSelect = action.payload;
    },
    setDateSelect(state, action: PayloadAction<number | undefined>) {
      state.dateSelect = action.payload;
    },
    removeDateSelect(state) {
      state.dateSelect = undefined;
    },
  },
});

export const selectCurrentView = (state: RootState) => state.view.current;
export const selectSatelliteSelect = (state: RootState) =>
  state.view.satelliteSelect;
export const selectDateSelect = (state: RootState) => state.view.dateSelect;

export const { setCurrentView, setSatelliteSelect, setDateSelect } =
  viewSlice.actions;
export const viewReducer = viewSlice.reducer;
