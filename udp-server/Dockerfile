FROM rust:latest

WORKDIR /app

COPY . .

# Build the project
RUN cargo build --release

# Set the command to run the built binary
CMD ["./target/release/udp-server"]