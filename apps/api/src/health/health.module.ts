import { Module } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';

import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { PrismaHealthIndicator } from './prisma.health.indicator';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService, PrismaHealthIndicator, PrismaService, HealthIndicatorService],
})
export class HealthModule {}
