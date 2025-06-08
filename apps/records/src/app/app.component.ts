import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListComponent } from "./list/list.component";

@Component({
  standalone: true,
  imports: [RouterModule, ListComponent],
  selector: 'app-root',
  template: '<h1 class="text-3xl font-bold my-8">Records list</h1><app-list></app-list><router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'records';
}
