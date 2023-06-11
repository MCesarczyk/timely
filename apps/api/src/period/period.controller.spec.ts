import { Test, TestingModule } from '@nestjs/testing';
import { PeriodController } from './period.controller';

describe('PeriodController', () => {
  let controller: PeriodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodController],
    }).compile();

    controller = module.get<PeriodController>(PeriodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
