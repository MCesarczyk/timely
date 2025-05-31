import { Test, TestingModule } from '@nestjs/testing';

import { PeriodController } from './period.controller';
import { PeriodService } from './period.service';
import { PrismaService } from '../prisma.service';

describe('PeriodController', () => {
  let controller: PeriodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodController],
      providers: [PeriodService, PrismaService],
    }).compile();

    controller = module.get<PeriodController>(PeriodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
