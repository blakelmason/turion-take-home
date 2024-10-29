use std::time::{SystemTime, UNIX_EPOCH};

use redis::Value;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::UdpMessage;

use super::csp_header::CspHeader;

#[derive(Serialize, Debug, Deserialize)]
pub struct TelemetryPacket {
    pub id: Uuid,             // UUID
    pub header: CspHeader,    // CSP header
    pub satellite_id: i32,    // Satellite ID
    pub temperature: f32,     // Temperature in Celsius
    pub battery_voltage: f32, // Battery voltage in Volts
    pub altitude: f32,        // Altitude in Kilometers
    pub epoch_timestamp: i64, // Unix timestamp
}

impl TelemetryPacket {
    pub fn from_buffer(buffer: UdpMessage, header: CspHeader) -> Self {
        let id = Uuid::new_v4();
        let satellite_id = i32::from_be_bytes(buffer[5..9].try_into().unwrap());
        let temperature = f32::from_be_bytes(buffer[9..13].try_into().unwrap());
        let battery_voltage = f32::from_be_bytes(buffer[13..17].try_into().unwrap());
        let altitude = f32::from_be_bytes(buffer[17..21].try_into().unwrap());
        let epoch_timestamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("Time went backwards")
            .as_millis() as i64;

        TelemetryPacket {
            id,
            header,
            satellite_id,
            temperature,
            battery_voltage,
            altitude,
            epoch_timestamp,
        }
    }

    pub fn from_redis(telemetry_packet_from_redis: &Value) -> Self {
        if let Value::BulkString(data) = telemetry_packet_from_redis {
            if let Ok(json_str) = std::str::from_utf8(data) {
                // Deserialize the JSON string into a TelemetryPacket
                if let Ok(packet) = serde_json::from_str::<TelemetryPacket>(json_str) {
                    return packet;
                }
            }
        }

        panic!("Failed to deserialize telemetry packet from Redis");
    }
}
