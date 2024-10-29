import { Controller, Get } from '@nestjs/common';
import { Satellite } from './satellite.entity';
import { SatelliteService } from './satellite.service';

@Controller('satellite')
export class SatelliteController {
  constructor(private readonly satelliteService: SatelliteService) {}

  @Get()
  async findAll(): Promise<Satellite[]> {
    return this.satelliteService.findAll();
  }
}
