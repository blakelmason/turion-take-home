import { TelemetryPacket } from "../../types/TelemetryPacket";

const DANGER_PROPERTIES = [
  "temperature",
  "battery_voltage",
  "altitude",
] as const;

const DANGER_PROPERTY = Object.fromEntries(
  DANGER_PROPERTIES.map((property) => [property, property])
) as {
  readonly [key in (typeof DANGER_PROPERTIES)[number]]: key;
};

export const DangerPropertiesSet = new Set(DANGER_PROPERTIES);

export const DANGER_TYPE = {
  WARNING: "WARNING",
  DANGER: "DANGER",
  NORMAL: "NORMAL",
} as const;

export type DangerType = (typeof DANGER_TYPE)[keyof typeof DANGER_TYPE];

export const checkDangerRanges = (
  telemetryPacket: TelemetryPacket,
  property: keyof TelemetryPacket
) => {
  switch (property) {
    case DANGER_PROPERTY.temperature:
      return checkTemperature(telemetryPacket.temperature);
    case DANGER_PROPERTY.battery_voltage:
      return checkBatteryVoltage(telemetryPacket.battery_voltage);
    case DANGER_PROPERTY.altitude:
      return checkAltitude(telemetryPacket.altitude);
    default:
      return DANGER_TYPE.NORMAL;
  }
};

const checkTemperature = (temperature: number): DangerType => {
  if (temperature >= 90 || temperature <= -90) {
    return DANGER_TYPE.DANGER;
  } else if (
    isInRange(temperature, 70, 89) ||
    isInRange(temperature, -89, -70)
  ) {
    return DANGER_TYPE.WARNING;
  } else {
    return DANGER_TYPE.NORMAL;
  }
};

const checkBatteryVoltage = (batteryVoltage: number): DangerType => {
  if (batteryVoltage <= 10) {
    return DANGER_TYPE.DANGER;
  } else if (isInRange(batteryVoltage, 11, 20)) {
    return DANGER_TYPE.WARNING;
  } else {
    return DANGER_TYPE.NORMAL;
  }
};

const checkAltitude = (altitude: number): DangerType => {
  if (altitude <= 250) {
    return DANGER_TYPE.DANGER;
  } else if (isInRange(altitude, 251, 300)) {
    return DANGER_TYPE.WARNING;
  } else {
    return DANGER_TYPE.NORMAL;
  }
};

const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
