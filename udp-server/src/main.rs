mod models;

use models::{csp_header::CspHeader, telemetry_packet::TelemetryPacket};
use redis::{
    streams::{StreamReadOptions, StreamReadReply},
    AsyncCommands, Client as RedisClient,
};
use std::{error::Error, fs, sync::Arc, time::Duration};
use tokio::{net::UdpSocket, time::sleep};
use tokio_postgres::{Client, NoTls};

pub type UdpMessage = [u8; 32];

const UDP_PORTS: &[u16] = &[8080, 8081];
const TELEMETRY_STREAM: &str = "telemetry_stream";

#[tokio::main(flavor = "multi_thread")]
async fn main() -> Result<(), Box<dyn Error>> {
    let redis_client = RedisClient::open("redis://redis:6379/")?;
    let mut redis_connection = redis_client.get_multiplexed_tokio_connection().await?;

    let _: () = redis_connection.del(TELEMETRY_STREAM).await?;

    let mut client = connect_to_postgres().await;

    setup_database(&client)
        .await
        .expect("Failed to setup database");

    let mut sockets = Vec::new();
    for &port in UDP_PORTS {
        let socket = UdpSocket::bind(("0.0.0.0", port)).await?;
        println!("UDP server listening on {}", port);
        sockets.push(Arc::new(socket));
    }

    // Process incoming UDP messages
    for socket in sockets {
        let write_client = redis_client.clone();
        tokio::spawn(async move {
            let mut buf: UdpMessage = [0u8; 32];
            let mut write_connection = write_client
                .get_multiplexed_tokio_connection()
                .await
                .expect("Failed to get write connection");
            loop {
                socket
                    .recv(&mut buf)
                    .await
                    .expect("Failed to receive UDP message");

                let telemetry_packet = process_udp_message(buf);

                let _: () = write_connection
                    .xadd(
                        TELEMETRY_STREAM,
                        "*",
                        &[("packet", serde_json::to_string(&telemetry_packet).unwrap())],
                    )
                    .await
                    .expect("Failed to add entry to telemetry_stream");
            }
        });
    }

    // Insert telemetry packets into the database
    tokio::spawn(async move {
        let read_client = redis_client.clone();
        let mut read_connection = read_client
            .get_multiplexed_tokio_connection()
            .await
            .expect("Failed to get read connection");

        let mut last_id = "0".to_string(); // Start from the beginning

        loop {
            let options = StreamReadOptions::default().block(0);
            let result: Option<StreamReadReply> = read_connection
                .xread_options(&[TELEMETRY_STREAM], &[&last_id], &options)
                .await
                .expect("Failed to read from telemetry_stream");

            if let Some(reply) = result {
                for stream_key in reply.keys {
                    for stream_id in stream_key.ids {
                        if let Some(packet) = stream_id.map.get("packet") {
                            let telemetry_packet = TelemetryPacket::from_redis(packet);

                            insert_telemetry_packet(&mut client, &telemetry_packet)
                                .await
                                .expect("Failed to insert telemetry packet into database");

                            last_id = stream_id.id.clone();
                        }
                    }
                }
            }
        }
    });

    // Keep the main function running indefinitely
    tokio::signal::ctrl_c()
        .await
        .expect("Failed to listen for ctrl_c signal");
    println!("Shutting down");

    Ok(())
}

async fn connect_to_postgres() -> tokio_postgres::Client {
    let connection_str = "host=postgres user=user password=password dbname=telemetry";
    loop {
        match tokio_postgres::connect(connection_str, NoTls).await {
            Ok((client, connection)) => {
                tokio::spawn(async move {
                    if let Err(e) = connection.await {
                        eprintln!("Connection error: {}", e);
                    }
                });
                return client;
            }
            Err(e) => {
                eprintln!(
                    "Failed to connect to Postgres: {}. Retrying in 3 seconds...",
                    e
                );
                sleep(Duration::from_secs(3)).await;
            }
        }
    }
}

async fn setup_database(client: &Client) -> Result<(), Box<dyn Error>> {
    // Read the SQL file
    let setup_database_sql = fs::read_to_string("sql/setup_database.sql")?;

    // Execute the SQL queries
    client
        .batch_execute(&setup_database_sql)
        .await
        .expect("Failed to execute SQL queries during database setup");

    println!("Database setup completed.");

    Ok(())
}

fn process_udp_message(message: UdpMessage) -> TelemetryPacket {
    let csp_header = CspHeader::from_buffer(message);
    let telemetry_packet = TelemetryPacket::from_buffer(message, csp_header);

    telemetry_packet
}

async fn insert_telemetry_packet(
    client: &mut Client,
    telemetry_packet: &TelemetryPacket,
) -> Result<(), Box<dyn Error>> {
    let transaction = client.transaction().await?;

    let csp_header = &telemetry_packet.header;
    // Upsert satellite
    transaction
        .execute(
            "INSERT INTO satellite (id) VALUES ($1) ON CONFLICT (id) DO NOTHING",
            &[&telemetry_packet.satellite_id],
        )
        .await?;

    transaction.execute(
        "INSERT INTO csp_header (id, priority, destination, source, port, hmac, rdp) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        &[
            &csp_header.id,
            &csp_header.priority,
            &csp_header.destination,
            &csp_header.source,
            &csp_header.port,
            &csp_header.hmac,
            &csp_header.rdp,
        ],
    ).await?;

    transaction.execute(
        "INSERT INTO telemetry_packet (id, csp_header_id, satellite_id, temperature, battery_voltage, altitude, epoch_timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        &[
            &telemetry_packet.id,
            &csp_header.id,
            &telemetry_packet.satellite_id,
            &telemetry_packet.temperature,
            &telemetry_packet.battery_voltage,
            &telemetry_packet.altitude,
            &telemetry_packet.epoch_timestamp,
        ],
    ).await?;

    transaction.commit().await?;

    Ok(())
}
