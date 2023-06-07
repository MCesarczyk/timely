import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PeriodService } from './period.service';
import { Period } from '@prisma/client';

@Controller('period')
export class PeriodController {
  constructor(private readonly periodService: PeriodService) {}

  @Get()
  getPeriods(): Promise<Period[]> {
    return this.periodService.getPeriods();
  }

  @Get('find')
  async getPeriodsByFilter(
    @Query('todoId') todoId: string,
    @Query('type') type: string
  ): Promise<Period[]> {
    if (todoId && type) {
      return this.periodService.getPeriodsByTodoIdAndType(todoId, type);
    }
    if (todoId) {
      return this.periodService.getPeriodsByTodoId(todoId);
    }
    if (type) {
      return this.periodService.getPeriodsByType(type);
    }
    return this.periodService.getPeriods();
  }

  @Get(':id')
  getPeriodById(@Param('id') id: string): Promise<Period> {
    return this.periodService.getPeriodById(id);
  }

  @Post()
  createPeriod(@Body() newPeriod: Period): Promise<Period> {
    return this.periodService.createPeriod({
      startTime: new Date(newPeriod.startTime),
      endTime: new Date(newPeriod.endTime),
      type: newPeriod.type,
      todoId: newPeriod.todoId,
    });
  }

  @Put(':id')
  updatePeriod(
    @Param('id') id: string,
    @Body() updatePeriod: Period
  ): Promise<Period> {
    return this.periodService.updatePeriod(Number(id), {
      startTime: new Date(updatePeriod.startTime),
      endTime: new Date(updatePeriod.endTime),
      type: updatePeriod.type,
      todoId: updatePeriod.todoId,
    });
  }

  @Delete(':id')
  deletePeriod(@Param('id') id: string): Promise<Period> {
    return this.periodService.deletePeriod(id);
  }
}
