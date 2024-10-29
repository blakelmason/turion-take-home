// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CspHeaderController } from './csp-header/csp-header.controller';
import { CspHeader } from './csp-header/csp-header.entity';
import { CspHeaderService } from './csp-header/csp-header.service';
import { LiveTelemetryModule } from './live-telemetry/live-telemetry.module'; // Import the LiveTelemetryModule
import { RedisService } from './redis/redis.service';
import { SatelliteController } from './satellite/satellite.controller';
import { Satellite } from './satellite/satellite.entity';
import { SatelliteService } from './satellite/satellite.service';
import { TelemetryPacketController } from './telemetry-packet/telemetry-packet.controller';
import { TelemetryPacket } from './telemetry-packet/telemetry-packet.entity';
import { TelemetryPacketService } from './telemetry-packet/telemetry-packet.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'telemetry',
      entities: [CspHeader, TelemetryPacket, Satellite],
      logging: false,
    }),
    TypeOrmModule.forFeature([CspHeader, TelemetryPacket, Satellite]),
    LiveTelemetryModule, // Add the LiveTelemetryModule to the imports array
  ],
  controllers: [
    AppController,
    TelemetryPacketController,
    CspHeaderController,
    SatelliteController,
  ],
  providers: [
    AppService,
    TelemetryPacketService,
    CspHeaderService,
    SatelliteService,
    RedisService,
  ],
})
export class AppModule {}
