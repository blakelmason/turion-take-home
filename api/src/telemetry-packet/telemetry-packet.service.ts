import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TelemetryPacket } from './telemetry-packet.entity';

const take = 500;
const order = { created_at: 'DESC' } as const;
const select: [
  'satellite_id',
  'id',
  'created_at',
  'temperature',
  'battery_voltage',
  'altitude',
  'epoch_timestamp',
] = [
  'satellite_id',
  'id',
  'created_at',
  'temperature',
  'battery_voltage',
  'altitude',
  'epoch_timestamp',
];

@Injectable()
export class TelemetryPacketService {
  constructor(
    @InjectRepository(TelemetryPacket)
    private readonly telemetryPacketRepository: Repository<TelemetryPacket>,
  ) {}

  async findBySatelliteId(satelliteId: number): Promise<TelemetryPacket[]> {
    return this.telemetryPacketRepository.find({
      where: { satellite: { id: satelliteId } },
      take,
      order,
      select,
    });
  }

  async findByDate(
    startDate: number,
    endDate: number,
  ): Promise<TelemetryPacket[]> {
    return this.telemetryPacketRepository.find({
      where: { created_at: Between(startDate, endDate) },
      take,
      order,
      select,
    });
  }
}
