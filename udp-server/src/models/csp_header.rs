use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::UdpMessage;

#[derive(Serialize, Debug, Deserialize)]
pub struct CspHeader {
    pub id: Uuid,         // UUID
    pub priority: i16,    // Packet priority (2 bits)
    pub destination: i16, // Destination address (6 bits)
    pub source: i16,      // Source address (6 bits)
    pub reserved: i16,    // Reserved (4 bits)
    pub port: i16,        // Destination port (6 bits)
    pub hmac: bool,       // HMAC flag (1 bit)
    pub rdp: bool,        // Reliable Datagram Protocol flag (1 bit)
}

impl CspHeader {
    pub fn from_buffer(buffer: UdpMessage) -> Self {
        let id = Uuid::new_v4();
        let priority = (buffer[0] >> 6) as i16;
        let destination = (((buffer[0] & 0x3F) << 2) | (buffer[1] >> 6)) as i16;
        let source = (((buffer[1] & 0x3F) << 2) | (buffer[2] >> 6)) as i16;
        let reserved = (((buffer[2] & 0x3F) << 2) | (buffer[3] >> 6)) as i16;
        let port = (((buffer[3] & 0x3F) << 2) | (buffer[4] >> 6)) as i16;
        let hmac = ((buffer[4] >> 1) & 0x01) != 0;
        let rdp = (buffer[4] & 0x01) != 0;

        CspHeader {
            id,
            priority,
            destination,
            source,
            reserved,
            port,
            hmac,
            rdp,
        }
    }
}
