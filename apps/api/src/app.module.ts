import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { PrismaService } from './prisma.service';
import { PeriodController } from './period/period.controller';
import { PeriodService } from './period/period.service';

@Module({
  imports: [],
  controllers: [AppController, TodoController, PeriodController],
  providers: [AppService, TodoService, PrismaService, PeriodService],
})
export class AppModule {}
