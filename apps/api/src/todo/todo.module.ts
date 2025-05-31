import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class TodoModule { }
