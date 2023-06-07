import { Test, TestingModule } from '@nestjs/testing';
import { PeriodService } from './period.service';

describe('PeriodService', () => {
  let service: PeriodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodService],
    }).compile();

    service = module.get<PeriodService>(PeriodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
