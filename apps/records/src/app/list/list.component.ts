import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { items } from './fixtures';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="px-4 py-2">
    <h2 class="text-xl font-bold my-4">History</h2>
    <ul class="flex flex-col gap-4 my-4">
      <li *ngFor="let item of items" class="flex gap-4 px-4 py-1 border-b-2 border-gray-700">
        <h3 class="text-lg font-semibold">{{item.title}}</h3>
        <p class="text-gray-600">{{item.content}}</p>
      </li>
    </ul>
  </div>`,
  styles: ``,
})
export class ListComponent {
  items = items;
}
