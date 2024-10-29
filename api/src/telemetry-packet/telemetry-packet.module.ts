import { Module } from '@nestjs/common';
import { TelemetryPacketService } from './telemetry-packet.service';
import { TelemetryPacketController } from './telemetry-packet.controller';

@Module({
  providers: [TelemetryPacketService],
  controllers: [TelemetryPacketController]
})
export class TelemetryPacketModule {}
