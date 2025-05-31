import { Module } from '@nestjs/common';

import { PeriodController } from './period.controller';
import { PeriodService } from './period.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PeriodController],
  providers: [PeriodService, PrismaService],
})
export class PeriodModule { }
