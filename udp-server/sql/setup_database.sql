DROP TABLE IF EXISTS telemetry_packet;
DROP TABLE IF EXISTS csp_header;
DROP TABLE IF EXISTS satellite;

CREATE TABLE IF NOT EXISTS csp_header (
    id UUID PRIMARY KEY,
    priority SMALLINT CHECK (priority BETWEEN 0 AND 3),
    destination SMALLINT CHECK (destination BETWEEN 0 AND 63),
    source SMALLINT CHECK (source BETWEEN 0 AND 63),
    port SMALLINT CHECK (port BETWEEN 0 AND 63),
    hmac BOOLEAN,
    rdp BOOLEAN,
    created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000)::BIGINT
);

CREATE INDEX idx_csp_header_created_at ON csp_header(created_at);

CREATE TABLE IF NOT EXISTS satellite (
    id INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS telemetry_packet (
    id UUID PRIMARY KEY,
    csp_header_id UUID REFERENCES csp_header(id),
    satellite_id INTEGER REFERENCES satellite(id),
    temperature REAL,
    battery_voltage REAL,
    altitude REAL,
    created_at BIGINT DEFAULT (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000)::BIGINT,
    epoch_timestamp BIGINT
);

CREATE INDEX idx_telemetry_packet_created_at ON telemetry_packet(created_at);
CREATE INDEX idx_telemetry_packet_satelite_id ON telemetry_packet(satellite_id);