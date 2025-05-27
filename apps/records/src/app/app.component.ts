import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  template: '<h1 class="text-4xl text-red-800 font-bold m-4">Records <router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'records';
}
