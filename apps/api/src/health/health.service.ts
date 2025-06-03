import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';

import { PrismaHealthIndicator } from './prisma.health.indicator';

@Injectable()
export class HealthService {
  constructor(private readonly prismaHealthIndicator: PrismaHealthIndicator) { }
  public getHealth(): Promise<HealthIndicatorResult> {
    return this.prismaHealthIndicator.isHealthy('postgres');
  }
}
