import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Period, PeriodListApiResponse } from './types';
import { PERIODS_API_URLS } from './periods.api.urls';

@Injectable({
  providedIn: 'root'
})
export class PeriodsService {
  constructor(private http: HttpClient) {}

  getPeriods(): Observable<PeriodListApiResponse> {
    return this.http.get<PeriodListApiResponse>(PERIODS_API_URLS.getPeriods, { responseType: 'json' });
  }

  getPeriod(periodId: string): Observable<Period> {
    const url = PERIODS_API_URLS.getPeriod.replace(':periodId', periodId);
    return this.http.get<Period>(url);
  }

  createPeriod(period: Period): Observable<Period> {
    return this.http.post<Period>(PERIODS_API_URLS.createPeriod, period);
  }

  updatePeriod(periodId: string, period: Period): Observable<Period> {
    const url = PERIODS_API_URLS.updatePeriod.replace(':periodId', periodId);
    return this.http.put<Period>(url, period);
  }

  deletePeriod(periodId: string): Observable<void> {
    const url = PERIODS_API_URLS.deletePeriod.replace(':periodId', periodId);
    return this.http.delete<void>(url);
  }
}
