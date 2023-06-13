import { Injectable } from '@nestjs/common';
import { Period } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PeriodService {
  constructor(private prisma: PrismaService) { }

  public getPeriods(perPage = 10, page = 1): Promise<Period[]> {
    return this.prisma.period.findMany({
      take: Number(perPage),
      skip: perPage * (Number(page) - 1),
    });
  }

  public getPeriodsNumber(): Promise<number> {
    return this.prisma.period.count();
  }

  public getPeriodById(id: string): Promise<Period> {
    return this.prisma.period.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  public getPeriodsByTodoId(id: string): Promise<Period[]> {
    return this.prisma.period.findMany({
      where: {
        todoId: Number(id),
      },
    });
  }

  public getPeriodsByType(type: string): Promise<Period[]> {
    return this.prisma.period.findMany({
      where: {
        type: type,
      },
    });
  }

  public getPeriodsByTodoIdAndType(
    id: string,
    type: string
  ): Promise<Period[]> {
    return this.prisma.period.findMany({
      where: {
        todoId: Number(id),
        type: type,
      },
    });
  }

  public createPeriod(data: {
    startTime: Date;
    endTime: Date;
    type: string;
    todoId: number;
  }): Promise<Period> {
    return this.prisma.period.create({
      data,
    });
  }

  public updatePeriod(
    id: number,
    newPeriod: {
      startTime: Date;
      endTime: Date;
      type: string;
      todoId: number;
    }
  ): Promise<Period> {
    return this.prisma.period.update({
      where: { id },
      data: newPeriod,
    });
  }

  public deletePeriod(id): Promise<Period> {
    return this.prisma.period.delete({
      where: { id: Number(id) },
    });
  }
}
