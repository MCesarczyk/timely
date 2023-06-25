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

@Controller('periods')
export class PeriodController {
  constructor(private readonly periodService: PeriodService) { }

  @Get()
  async getPeriods(
    @Query('todoId') todoId: number,
    @Query('type') type: string,
    @Query('perPage') perPage = 10,
    @Query('page') page = 1
  ): Promise<{ data: Period[], page: number, total: number }> {
    const where = { todoId, type };
    const total = await this.periodService.getPeriodsNumber({ todoId, type });
    const data = await this.periodService.getPeriods({ todoId, type }, perPage, page);
    return { total, page: Number(page), data };
  }

  @Get(':id')
  getPeriodById(@Param('id') id: number): Promise<Period> {
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
