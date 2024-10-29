import { Controller, Get, Param, Query } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { TelemetryPacket } from './telemetry-packet.entity';
import { TelemetryPacketService } from './telemetry-packet.service';

@Controller('telemetry-packet')
export class TelemetryPacketController {
  constructor(
    private readonly telemetryPacketService: TelemetryPacketService,
    private readonly redisService: RedisService,
  ) {}

  @Get('satellite/:satelliteId')
  async findBySatelliteId(
    @Param('satelliteId') satelliteId: number,
  ): Promise<TelemetryPacket[]> {
    return this.telemetryPacketService.findBySatelliteId(satelliteId);
  }

  @Get('date')
  async findByDateRange(
    @Query('startDate') startDate: number,
    @Query('endDate') endDate: number,
  ): Promise<TelemetryPacket[]> {
    return this.telemetryPacketService.findByDate(startDate, endDate);
  }

  @Get('live')
  async getRecentTelemetryPackets() {
    return this.redisService.getRecentTelemetryPackets();
  }
}
