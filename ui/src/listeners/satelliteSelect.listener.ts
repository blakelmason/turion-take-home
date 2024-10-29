import { createAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { startAppListening } from "../listenerMiddleware";
import { setAllHistorical } from "../slices/historical.slice";

export const getHistoricalDataBySatellite = createAction(
  "getHistoricalDataBySatellite",
  (payload: string) => ({
    payload,
  })
);

export const startSatelliteSelectListener = () => {
  startAppListening({
    actionCreator: getHistoricalDataBySatellite,
    effect: async (action, { dispatch }) => {
      const { data } = await api.get(
        `/telemetry-packet/satellite/${action.payload}`
      );

      dispatch(setAllHistorical(data));
    },
  });
};
