import { createAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { startAppListening } from "../listenerMiddleware";
import { setAllSatellite } from "../slices/satellite.slice";

export const getSatelliteDataAction = createAction("getSatelliteData");

export const startGetSatelliteDataListener = () => {
  startAppListening({
    actionCreator: getSatelliteDataAction,
    effect: async (_action, { dispatch }) => {
      const { data } = await api.get("/satellite");

      dispatch(setAllSatellite(data));
    },
  });
};
