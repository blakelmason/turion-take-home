import { TelemetryPacket } from "../../types/TelemetryPacket";

export const VIEW = {
  HISTORICAL: "HISTORICAL",
  LIVE: "LIVE",
} as const;

export const VIEW_ROUTE_MAP = {
  HISTORICAL: "/",
  LIVE: "/live",
} as const;

export type View = (typeof VIEW)[keyof typeof VIEW];

export const dataTableProperties = [
  "satellite_id",
  "temperature",
  "battery_voltage",
  "altitude",
  "epoch_timestamp",
] as const satisfies readonly (keyof TelemetryPacket)[];

export type DataTableProperty = (typeof dataTableProperties)[number];
