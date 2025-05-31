import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental'
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { ApiBaseUrlInterceptor } from './common/api.base.url.interceptor';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideTanStackQuery(new QueryClient()),
    provideHttpClient(withInterceptors([ApiBaseUrlInterceptor]))
  ],
};
