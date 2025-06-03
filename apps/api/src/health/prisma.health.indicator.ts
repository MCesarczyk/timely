import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult, HealthIndicatorService } from '@nestjs/terminus';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaHealthIndicator {
  constructor(private readonly prisma: PrismaService, private readonly healthIndicatorService: HealthIndicatorService) {
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const indicator = this.healthIndicatorService.check(key);
    try {

      const isHealthy = await this.prisma.$queryRaw`SELECT 1`;

      if (!isHealthy) {
        return indicator.down({ message: 'Database is not healthy' });
      }

      return indicator.up();
    } catch (error) {
      return indicator.down('Unable to retrieve data');
    }
  }
}
