export interface CspHeader {
  id: string; // UUID
  priority: number; // Packet priority (2 bits)
  destination: number; // Destination address (6 bits)
  source: number; // Source address (6 bits)
  reserved: number; // Reserved (4 bits)
  port: number; // Destination port (6 bits)
  hmac: boolean; // HMAC flag (1 bit)
  rdp: boolean; // Reliable Datagram Protocol flag (1 bit)
  created_at: number;
}
