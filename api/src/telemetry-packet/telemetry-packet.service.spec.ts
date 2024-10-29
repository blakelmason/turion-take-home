import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryPacketService } from './telemetry-packet.service';

describe('TelemetryPacketService', () => {
  let service: TelemetryPacketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelemetryPacketService],
    }).compile();

    service = module.get<TelemetryPacketService>(TelemetryPacketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
