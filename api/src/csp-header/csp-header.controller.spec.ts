import { Test, TestingModule } from '@nestjs/testing';
import { CspHeaderController } from './csp-header.controller';

describe('CspHeaderController', () => {
  let controller: CspHeaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CspHeaderController],
    }).compile();

    controller = module.get<CspHeaderController>(CspHeaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
