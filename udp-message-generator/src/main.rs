use rand::Rng;
use std::net::UdpSocket;
use std::thread;
use std::time::Duration;

const UDP_SERVER_PORTS: [&str; 2] = ["8080", "8081"];
const UDP_SERVER: &str = "udp-server";

fn main() -> std::io::Result<()> {
    let socket = UdpSocket::bind("0.0.0.0:0")?;

    println!("UDP message generator ready");

    let mut current_server_index = 0;

    loop {
        let port = UDP_SERVER_PORTS[current_server_index];
        let server_address = format!("{}:{}", UDP_SERVER, port);
        let telemetry_data = generate_random_telemetry();
        socket.send_to(&telemetry_data, &server_address)?;

        current_server_index = (current_server_index + 1) % UDP_SERVER_PORTS.len();
        thread::sleep(Duration::from_secs(1));
    }
}

fn generate_random_telemetry() -> Vec<u8> {
    let mut rng = rand::thread_rng();

    // Random csp header data
    let priority = rng.gen_range(0..4);
    let destination = rng.gen_range(0..64);
    let source = rng.gen_range(0..64);
    let reserved = 0;
    let port = rng.gen_range(0..64);
    let hmac = rng.gen_range(0..2);
    let rdp = rng.gen_range(0..2);

    // Predefined satellite IDs
    let satellite_ids: [u32; 10] = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009];
    let satellite_id = satellite_ids[rng.gen_range(0..satellite_ids.len())];

    // Random telemetry data
    let temperature: f32 = rng.gen_range(-100.0..=100.0);
    let battery_voltage: f32 = rng.gen_range(0.0..=100.0);
    let altitude: f32 = rng.gen_range(200.0..=400.0);

    // Pack data into a binary array
    let mut buffer = Vec::new();
    buffer.push(priority << 6 | destination >> 2);
    buffer.push((destination << 6) | (source >> 2));
    buffer.push((source << 6) | (reserved >> 2));
    buffer.push((reserved << 6) | (port >> 2));
    buffer.push((port << 6) | (hmac << 1) | rdp);
    buffer.extend_from_slice(&satellite_id.to_be_bytes());
    buffer.extend_from_slice(&temperature.to_be_bytes());
    buffer.extend_from_slice(&battery_voltage.to_be_bytes());
    buffer.extend_from_slice(&altitude.to_be_bytes());

    buffer
}
