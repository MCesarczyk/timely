import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) { }

  public getTodos(): Promise<Todo[]> {
    return this.prisma.todo.findMany()
  }

  public getTodoById(id: string): Promise<Todo> {
    return this.prisma.todo.findUnique({
      where: {
        id: Number(id)
      }
    })
  }

  public createTodo(
    data: {
      content: string,
      done: boolean
    }
  ): Promise<Todo> {
    return this.prisma.todo.create({
      data
    })
  }

  public updateTodo(
    params: {
      where: {
        id: number
      },
      data: {
        content: string,
        done: boolean
      }
    }
  ): Promise<Todo> {
    const { data, where } = params;
    return this.prisma.todo.update({
      data,
      where
    })
  }

  public deleteTodo(
    where: {
      id: number
    }
  ): Promise<Todo> {
    return this.prisma.todo.delete({
      where
    })
  }
}
