import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { LiveTelemetryGateway } from 'src/live-telemetry/live-telemetry.gateway';

@Injectable()
export class RedisService implements OnModuleInit {
  private redisClient: Redis;

  constructor(private readonly liveTelemetryGateway: LiveTelemetryGateway) {}

  onModuleInit() {
    this.redisClient = new Redis({
      host: 'redis', // Replace with your Redis host
      port: 6379, // Replace with your Redis port
    });

    this.startListeningToStream();
  }

  private async startListeningToStream() {
    while (true) {
      const result = await this.redisClient.xread(
        'BLOCK',
        0,
        'STREAMS',
        'telemetry_stream',
        '$',
      );

      if (result) {
        for (const [_streamName, messages] of result) {
          for (const [_id, fields] of messages) {
            const packet = JSON.parse(fields[1]);
            this.liveTelemetryGateway.sendLiveUpdate(packet);
          }
        }
      }
    }
  }

  async getRecentTelemetryPackets(): Promise<any[]> {
    const result = await this.redisClient.xrevrange(
      'telemetry_stream',
      '+',
      '-',
      'COUNT',
      20,
    );

    return result.map(([id, fields]) => {
      return {
        id,
        ...JSON.parse(fields[1]),
      };
    });
  }
}
