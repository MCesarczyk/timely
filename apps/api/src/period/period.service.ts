import { Injectable } from '@nestjs/common';
import { Period } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PeriodService {
  constructor(private prisma: PrismaService) { }

  public getPeriods(where: object, perPage: number, page: number): Promise<Period[]> {
    return this.prisma.period.findMany({
      take: Number(perPage),
      skip: perPage * (page - 1),
      where
    });
  }

  public getPeriodsNumber(where: object): Promise<number> {
    return this.prisma.period.count({ where });
  }

  public getPeriodById(id: number): Promise<Period> {
    return this.prisma.period.findUnique({
      where: {
        id,
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
