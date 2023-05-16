import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { todos } from './todos-mock';
import { TodoDTO } from './todo.dto';

let todosData = todos;

@Controller('todos')
export class TodoController {
  @Get()
  getTodos(): TodoDTO[] {
    return todosData;
  }

  @Post()
  createTodo(@Body() createTodo: TodoDTO): TodoDTO {
    const newTodo: TodoDTO = {
      id: (todosData.length + 1).toString(),
      ...createTodo
    };

    todosData = [...todosData, newTodo];

    return newTodo;
  }

  @Put(':id')
  updateTodo(@Body() updateTodo: TodoDTO, @Param('id') id): TodoDTO {
    todosData = todosData.map(todo => (todo.id === id ? updateTodo : todo));
    return updateTodo;
  }

  @Delete(':id')
  deleteTodo(@Param('id') id): TodoDTO {
    const todoToDelete = todosData.find(todo => todo.id === id);
    todosData = todosData.filter(todo => todo.id !== id);

    return todoToDelete;
  }
}
