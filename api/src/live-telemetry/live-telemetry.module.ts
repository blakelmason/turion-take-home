import { Module } from '@nestjs/common';
import { LiveTelemetryGateway } from './live-telemetry.gateway';

@Module({
  providers: [LiveTelemetryGateway], // Register the gateway as a provider
  exports: [LiveTelemetryGateway], // Export the gateway to make it available in other modules
})
export class LiveTelemetryModule {}
