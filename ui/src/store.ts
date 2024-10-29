import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./listenerMiddleware";
import { startDateSelectListener } from "./listeners/dateSelect.listener";
import { startGetSatelliteDataListener } from "./listeners/getSatellitesData.listener";
import { startSatelliteSelectListener } from "./listeners/satelliteSelect.listener";
import { historicalReducer } from "./slices/historical.slice";
import { liveReducer } from "./slices/live.slice";
import { satelliteReducer } from "./slices/satellite.slice";
import { viewReducer } from "./slices/view.slice";

startGetSatelliteDataListener();
startSatelliteSelectListener();
startDateSelectListener();

export const store = configureStore({
  reducer: {
    view: viewReducer,
    historical: historicalReducer,
    satellite: satelliteReducer,
    live: liveReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const appDispatch: AppDispatch = store.dispatch;
