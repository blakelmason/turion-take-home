import { Test, TestingModule } from '@nestjs/testing';
import { LiveTelemetryGateway } from './live-telemetry.gateway';

describe('LiveTelemetryGateway', () => {
  let gateway: LiveTelemetryGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveTelemetryGateway],
    }).compile();

    gateway = module.get<LiveTelemetryGateway>(LiveTelemetryGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
