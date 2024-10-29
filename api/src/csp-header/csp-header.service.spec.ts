import { Test, TestingModule } from '@nestjs/testing';
import { CspHeaderService } from './csp-header.service';

describe('CspHeaderService', () => {
  let service: CspHeaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CspHeaderService],
    }).compile();

    service = module.get<CspHeaderService>(CspHeaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
