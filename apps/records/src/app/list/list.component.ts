import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodsService } from '../periods/periods.service';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/types';
import { Period } from '../periods/types';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="px-4 py-2 bg-slate-300">
    <h2 class="text-xl font-bold my-4">History</h2>
    <ul class="flex flex-col gap-4 my-4">
      <li *ngFor="let item of periods" class="flex gap-4 px-4 py-1 border-b-2 border-gray-700">
        <h3 class="text-lg font-semibold">{{findTaskTitle(item.todoId)}}</h3>
        <p class="text-gray-600">{{item.type}} - {{item.startTime}} - {{item.endTime}}</p>
      </li>
    </ul>
  </div>`,
  styles: ``,
})
export class ListComponent {
  tasks: Task[] = [];
  periods: Period[] = [];

  constructor(private periodService: PeriodsService, private taskService: TasksService) { }

  ngOnInit() {
    this.periodService.getPeriods().subscribe(periods => {
      this.periods = periods.data;
    });

    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  findTaskTitle(todoId: number | null): string | undefined {
    return this.tasks.find(task => task.id === todoId)?.title || 'unassigned';
  }
}
