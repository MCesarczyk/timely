import { Test, TestingModule } from '@nestjs/testing';
import { HealthIndicatorService } from '@nestjs/terminus';

import { HealthService } from './health.service';
import { PrismaHealthIndicator } from './prisma.health.indicator';
import { PrismaService } from '../prisma.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService, HealthIndicatorService, PrismaHealthIndicator, PrismaService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
