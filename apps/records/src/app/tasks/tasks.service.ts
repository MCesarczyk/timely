import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TASKS_API_URLS } from './tasks.api.urls';
import { Task } from './types';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(TASKS_API_URLS.getTasks, { responseType: 'json' });
  }
}
