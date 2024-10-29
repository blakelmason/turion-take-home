import { Module } from '@nestjs/common';
import { SatelliteController } from './satellite.controller';
import { SatelliteService } from './satellite.service';

@Module({
  providers: [SatelliteService],
  controllers: [SatelliteController],
})
export class SatelliteModule {}
