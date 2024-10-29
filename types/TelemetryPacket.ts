import { CspHeader } from "./CspHeader";

export interface TelemetryPacket {
  id: string; // UUID
  header: CspHeader; // CSP header
  satellite_id: string; // Satellite ID
  temperature: number; // Temperature in Celsius
  battery_voltage: number; // Battery voltage in Volts
  altitude: number; // Altitude in Kilometers
  epoch_timestamp: number; // Unix timestamp in milliseconds
}
