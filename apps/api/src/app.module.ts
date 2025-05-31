import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { HealthModule } from './health/health.module';
import { PeriodModule } from './period/period.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [HealthModule, PeriodModule, TodoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
