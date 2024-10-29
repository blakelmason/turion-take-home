import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryPacketController } from './telemetry-packet.controller';

describe('TelemetryPacketController', () => {
  let controller: TelemetryPacketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelemetryPacketController],
    }).compile();

    controller = module.get<TelemetryPacketController>(TelemetryPacketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
