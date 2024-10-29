import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Satellite } from './satellite.entity';

@Injectable()
export class SatelliteService {
  constructor(
    @InjectRepository(Satellite)
    private satelliteRepository: Repository<Satellite>,
  ) {}

  async findAll(): Promise<Satellite[]> {
    return this.satelliteRepository.find();
  }
}
