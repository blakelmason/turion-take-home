import { createAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { startAppListening } from "../listenerMiddleware";
import { setAllHistorical } from "../slices/historical.slice";

export const getHistoricalDataByDate = createAction(
  "getHistoricalDataByDate",
  (payload: { startDate: number; endDate: number }) => ({
    payload,
  })
);

export const startDateSelectListener = () => {
  startAppListening({
    actionCreator: getHistoricalDataByDate,
    effect: async (action, { dispatch }) => {
      const { data } = await api.get(`/telemetry-packet/date`, {
        params: {
          ...action.payload,
        },
      });

      dispatch(setAllHistorical(data));
    },
  });
};
