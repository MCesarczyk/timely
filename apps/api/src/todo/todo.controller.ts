import { Controller, Get } from '@nestjs/common';
import { todos } from './todos-mock';
import { TodoDTO } from './todo.dto';

let todosData = todos;

@Controller('todos')
export class TodoController {
  @Get()
  getTodos(): TodoDTO[] {
    return todosData;
  }
}
