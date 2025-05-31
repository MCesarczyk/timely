import { Test, TestingModule } from '@nestjs/testing';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaService } from '../prisma.service';

describe('TodosController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService, PrismaService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
